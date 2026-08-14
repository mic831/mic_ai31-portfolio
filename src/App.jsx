import { useEffect, useMemo, useRef, useState } from "react";
import { automations, navItems, profile, storyChapters, videos } from "./data/portfolio";

const routes = {
  "/": "home",
  "/video": "video",
  "/automation": "automation",
  "/website": "website",
  "/agents": "agents",
  "/contact": "contact",
  "/admin": "admin",
};

const agentDemoVideoSrc = "/assets/ai-agent-phone-demo.mp4";

function getPath() {
  return window.location.hash.replace("#", "") || "/";
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Header({ path }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate("/")} type="button">
        <span className="brand-word">Mic_ai<span>31</span></span>
      </button>
      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            className={path === item.href ? "active" : ""}
            key={item.href}
            onClick={() => navigate(item.href)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Reveal({ children, className = "" }) {
  return <section className={`reveal ${className}`}>{children}</section>;
}

function CreativeScene({ chapter, overlay = false }) {
  const creativeVideoRef = useRef(null);
  const creativeCta = "View Creative Work ->";

  useEffect(() => {
    const video = creativeVideoRef.current;
    if (!video) return undefined;

    const restartCreativeVideo = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("creative-arrival", restartCreativeVideo);
    return () => video.removeEventListener("creative-arrival", restartCreativeVideo);
  }, []);

  return (
    <div className={overlay ? "creative-scene overlay-preview" : "creative-scene"}>
      <div className="creative-stage" aria-label="Future AI creative character style loop">
        <div className="creative-character-slot">
          <video
            aria-hidden="true"
            autoPlay
            className="creative-style-video"
            loop
            muted
            playsInline
            preload="auto"
            ref={creativeVideoRef}
            src="/assets/ai-creative-michael-style-loop.mp4"
          />
        </div>
      </div>
      <article className="creative-copy">
        <p className="eyebrow">{chapter.label}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.description}</p>
        <div className="chapter-milestones" aria-label={`${chapter.label} milestones`}>
          {chapter.milestones.map((milestone) => (
            <span key={milestone}>{milestone}</span>
          ))}
        </div>
        <button className="glass-link" onClick={() => navigate(chapter.href)} type="button">
          {creativeCta}
        </button>
      </article>
    </div>
  );
}

function StoryChapter({ chapter, align = "left" }) {
  if (chapter.id === "video") return <CreativeChapter chapter={chapter} />;
  if (chapter.id === "automation") return <AutomationChapter chapter={chapter} />;
  if (chapter.id === "agent") return <AgentChapter chapter={chapter} />;

  const isWebsiteChapter = chapter.id === "website";

  return (
    <Reveal
      className={`story-chapter ${align === "right" ? "reverse" : ""} ${
        isWebsiteChapter ? "website-story-chapter" : ""
      }`}
    >
      {isWebsiteChapter && (
        <div className="website-chapter-bg" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="/assets/ai-website-background.mp4"
          />
        </div>
      )}
      {!isWebsiteChapter && (
        <div className="chapter-index">
          <span>{chapter.number}</span>
          <p>{chapter.period}</p>
        </div>
      )}
      <article>
        <p className="eyebrow">{chapter.label}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.description}</p>
        <div className="chapter-milestones" aria-label={`${chapter.label} milestones`}>
          {chapter.milestones.map((milestone) => (
            <span key={milestone}>{milestone}</span>
          ))}
        </div>
        {!isWebsiteChapter && (
          <button className="text-link" onClick={() => navigate(chapter.href)} type="button">
            {chapter.cta}
          </button>
        )}
      </article>
      <ScrollCue />
    </Reveal>
  );
}

function CreativeChapter({ chapter }) {
  return (
    <Reveal className="creative-chapter">
      <CreativeScene chapter={chapter} />
      <ScrollCue />
    </Reveal>
  );
}

function AutomationChapter({ chapter }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.currentTime = 0;
        video.play().catch(() => {});
      },
      { threshold: 0.48 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal className="automation-chapter">
      <div className="automation-scene">
        <div className="automation-visual" aria-label="AI automation workflow visual">
          <video
            aria-hidden="true"
            muted
            playsInline
            poster="/assets/automation-flow-visual.png"
            preload="auto"
            ref={videoRef}
            src="/assets/automation-pipeline.mp4"
          />
        </div>
        <article className="automation-copy">
          <p className="eyebrow">{chapter.label}</p>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
          <div className="chapter-milestones" aria-label={`${chapter.label} milestones`}>
            {chapter.milestones.map((milestone) => (
              <span key={milestone}>{milestone}</span>
            ))}
          </div>
          <button className="glass-link" onClick={() => navigate(chapter.href)} type="button">
            View Automation Work -&gt;
          </button>
        </article>
      </div>
      <ScrollCue />
    </Reveal>
  );
}

function AgentChapter({ chapter }) {
  return (
    <Reveal className="agent-chapter">
      <div className="agent-chapter-scene">
        <article className="agent-chapter-copy">
          <p className="eyebrow">{chapter.label}</p>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
          <div className="chapter-milestones" aria-label={`${chapter.label} milestones`}>
            {chapter.milestones.map((milestone) => (
              <span key={milestone}>{milestone}</span>
            ))}
          </div>
          <button className="glass-link" onClick={() => navigate(chapter.href)} type="button">
            View Agent Work -&gt;
          </button>
        </article>
        <AgentPhonePrototype />
      </div>
      <ScrollCue />
    </Reveal>
  );
}

function ScrollCue({ tone = "light" }) {
  return (
    <div className={`scroll-cue ${tone === "dark" ? "scroll-cue-dark" : ""}`} aria-hidden="true">
      Scroll for more
    </div>
  );
}

function Home() {
  const heroVideoRef = useRef(null);
  const seekInFlightRef = useRef(false);
  const targetScrubTimeRef = useRef(0);

  const clampVideoTime = (time, duration) => Math.min(Math.max(time, 0), duration);

  const runQueuedSeek = () => {
    const video = heroVideoRef.current;
    if (!video || !video.duration) return;

    if (seekInFlightRef.current) return;

    const target = clampVideoTime(targetScrubTimeRef.current, video.duration);

    if (Math.abs(video.currentTime - target) < 0.012) return;

    seekInFlightRef.current = true;
    video.currentTime = target;
  };

  const setHeroScrubTarget = (targetTime) => {
    const video = heroVideoRef.current;
    if (!video || !video.duration) return;

    targetScrubTimeRef.current = clampVideoTime(targetTime, video.duration);
    runQueuedSeek();
  };

  const scrubHeroVideo = (event) => {
    const video = heroVideoRef.current;
    if (!video || !video.duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const progress = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    setHeroScrubTarget(progress * video.duration);
  };

  const setHeroVideoToFront = () => {
    const video = heroVideoRef.current;
    if (!video || !video.duration) return;
    const frontFrameTime = video.duration * 0.5;
    targetScrubTimeRef.current = frontFrameTime;
    video.currentTime = frontFrameTime;
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return undefined;

    const handleSeeked = () => {
      seekInFlightRef.current = false;
      runQueuedSeek();
    };

    video.addEventListener("seeked", handleSeeked);
    return () => video.removeEventListener("seeked", handleSeeked);
  }, []);

  return (
    <>
      <section
        className="hero"
        onPointerLeave={() => setHeroScrubTarget(heroVideoRef.current?.duration * 0.5 || 0)}
        onPointerMove={scrubHeroVideo}
      >
        <div className="hero-copy">
          <p className="eyebrow">AI portfolio / creative / web / automation / agents</p>
          <h1>
            I’m <span>Michael</span>, not a traditional coder, just someone who
            kept following what AI made possible.
          </h1>
          <p className="lead">{profile.intro}</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => navigate("/video")} type="button">
              Watch the work
            </button>
            <button className="secondary" onClick={() => navigate("/contact")} type="button">
              Reach out
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-label="Interactive portrait of Michael">
          <video
            aria-hidden="true"
            className="hero-portrait-video"
            muted
            onLoadedMetadata={setHeroVideoToFront}
            playsInline
            preload="auto"
            ref={heroVideoRef}
            src="/assets/michael-head-turn.mp4?v=3"
          />
          <div className="cursor-note" aria-hidden="true">
            <span>Move your cursor to make me dizzy</span>
          </div>
        </div>
        <ScrollCue />
      </section>

      <section className="why-moment" aria-label="Why I started">
        <div className="why-stage">
          <div className="why-visual" aria-label="Michael working on AI-assisted web building">
            <video
              aria-hidden="true"
              autoPlay
              loop
              muted
              onLoadedMetadata={(event) => {
                event.currentTarget.playbackRate = 0.8;
              }}
              playsInline
              poster="/assets/michael-vibe-coding-desk-wide.png"
              preload="auto"
              src="/assets/michael-working-loop.mp4"
            />
            <video
              aria-hidden="true"
              className="why-transition-video"
              muted
              onPlay={() => {
                document.body.classList.remove("handoff-previewing");
                document.body.classList.remove("handoff-committing");
                document.body.classList.add("transition-locked");
              }}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                if (!video.duration) return;
                const previewAt = Math.min(7, video.duration * 0.88);
                const commitAt = Math.min(video.duration - 0.18, previewAt + 0.34);

                document.body.classList.toggle(
                  "handoff-previewing",
                  video.currentTime >= previewAt,
                );
                document.body.classList.toggle(
                  "handoff-committing",
                  video.currentTime >= commitAt,
                );
              }}
              onEnded={() => {
                document.body.classList.add("handoff-previewing");
                document.body.classList.add("handoff-committing");
                document.body.classList.add("handoff-landed");
                document.body.classList.add("creative-video-arriving");

                requestAnimationFrame(() => {
                  const html = document.documentElement;
                  const previousScrollBehavior = html.style.scrollBehavior;
                  const previousSnap = html.style.scrollSnapType;
                  const creativeChapter = document.querySelector(".creative-chapter");

                  html.style.scrollBehavior = "auto";
                  html.style.scrollSnapType = "none";

                  if (creativeChapter) {
                    const targetTop = creativeChapter.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: targetTop, behavior: "auto" });
                    creativeChapter.classList.add("visible");
                    const creativeVideo = creativeChapter.querySelector(".creative-style-video");
                    creativeVideo?.dispatchEvent(new Event("creative-arrival"));
                  }

                  html.style.scrollBehavior = previousScrollBehavior;
                  html.style.scrollSnapType = previousSnap;

                  window.setTimeout(() => {
                    document.body.classList.remove("handoff-previewing");
                    document.body.classList.remove("handoff-committing");
                    document.body.classList.remove("transition-locked");
                    window.setTimeout(() => {
                      document.body.classList.remove("handoff-landed");
                    }, 120);
                    window.setTimeout(() => {
                      document.body.classList.remove("creative-video-arriving");
                    }, 980);
                  }, 420);
                });
              }}
              playsInline
              poster="/assets/michael-vibe-coding-desk-wide.png"
              preload="auto"
              src="/assets/michael-monitor-transition.mp4"
            />
          </div>
          <article className="why-copy">
            <p className="eyebrow">Why I started</p>
            <h2>One chance pulled me into AI, and I kept going.</h2>
            <p>
              I started as someone outside the technical world, but AI made the
              technical side feel reachable. That was the moment the journey
              really began.
            </p>
            <div className="why-signals" aria-label="Early AI learning signals">
              <span>Outside coding</span>
              <span>AI curiosity</span>
              <span>Vibe coding</span>
              <span>Learning by building</span>
            </div>
          </article>
          <ScrollCue tone="dark" />
        </div>
        <div className="why-scroll-beat why-scroll-transition" aria-hidden="true" />
      </section>

      <div className="storyline" aria-label="AI work timeline">
        {storyChapters.map((chapter, index) => (
          <StoryChapter
            align={index % 2 === 0 ? "left" : "right"}
            chapter={chapter}
            key={chapter.id}
          />
        ))}
      </div>

      <Reveal className="closing-cta">
        <p className="eyebrow">Next step</p>
        <h2>If the short version is enough, reach out! If not, explore my work!</h2>
        <div className="hero-actions">
          <button className="primary" onClick={() => navigate("/contact")} type="button">
            Contact me
          </button>
          <button className="secondary" onClick={() => navigate("/video")} type="button">
            Start with video
          </button>
        </div>
      </Reveal>
    </>
  );
}

function VideoPage() {
  return (
    <main className="video-page">
      <div className="video-beams" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <section className="video-hero">
        <p className="eyebrow">AI creative</p>
        <h1>AI Creative</h1>
        <p>
          I started with the earliest AI video models, testing almost every tool I could find.
          At first I built motion frame by frame; now tools like Seedance let me direct scenes
          with speed, control, and taste.
        </p>
      </section>

      <section className="video-grid">
        {videos.map((video, index) => (
          <article
            className={`video-card ${video.orientation === "portrait" ? "portrait" : ""}`}
            key={video.id}
          >
            <div className="video-card-media">
              {video.src ? (
                <video controls playsInline preload="metadata" src={video.src} />
              ) : null}
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="video-card-copy">
              <strong>{video.title}</strong>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function AutomationPage() {
  return (
    <main className="automation-page">
      <section className="automation-page-hero">
        <p className="eyebrow">Automation and AI agent</p>
        <h1>Systems that think, move, and repeat the work for me.</h1>
        <p>
          This page will hold two proof points: a screen-recorded automation flow, and a phone
          recording of my AI agent in action.
        </p>
      </section>

      <div className="automation-showcase">
        <section className="automation-feature automation-flow-feature">
          <article>
            <p className="eyebrow">Automation demo</p>
            <h2>Screen-recorded workflows, from trigger to output.</h2>
            <p>
              A dedicated space for the flow recording: n8n canvases, API steps, content systems,
              and the logic behind repetitive work becoming one clean process.
            </p>
          </article>
          <div className="automation-demo-frame" aria-label="Automation screen recording preview">
            <div className="automation-window-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <video
              autoPlay
              className="automation-flow-video"
              controls
              loop
              muted
              playsInline
              preload="metadata"
              src="/assets/automation-flow-demo.mp4"
            />
          </div>
        </section>

        <section className="automation-feature automation-agent-feature">
          <article>
            <p className="eyebrow">AI agent</p>
            <h2>An AI agent that keeps me posted.</h2>
            <p>
              It reminds me of important AI updates and helps me keep up with what is happening
              in the AI world.
            </p>
          </article>
          <div className="automation-phone-wrap">
            <AgentPhonePrototype />
          </div>
        </section>
      </div>
    </main>
  );
}

function WebsitePage() {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">AI website</p>
        <h1>This portfolio is the first case study.</h1>
        <p>
          This page will later show how the site was planned, designed, built,
          and iterated with AI tools while keeping the final result visually
          intentional.
        </p>
      </div>
      <section className="process-panel">
        <article>
          <span>01</span>
          <h2>Tools</h2>
          <p>Cursor, v0, 21st.dev, ReactBits, and AI-assisted frontend workflows.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Proof</h2>
          <p>You are seeing the website work now. The goal is a portfolio that demonstrates the standard by being the standard.</p>
        </article>
      </section>
    </main>
  );
}

function AgentPhonePrototype() {
  return (
    <div className="agent-phone-scene" aria-label="Telegram AI agent conversation preview">
      <div className="agent-phone-depth" aria-hidden="true" />
      <div className="agent-phone">
        <div className="agent-phone-buttons" aria-hidden="true" />
        <div className="agent-phone-side" aria-hidden="true" />
        <div className="agent-phone-frame">
          <div className="agent-phone-speaker" aria-hidden="true" />
          <div className="agent-phone-screen">
            {agentDemoVideoSrc ? (
              <video
                autoPlay
                className="agent-phone-video"
                loop
                muted
                playsInline
                preload="auto"
                src={agentDemoVideoSrc}
              />
            ) : (
              <div className="agent-chat-placeholder">
                <div className="agent-chat-topbar">
                  <span className="agent-avatar">H</span>
                  <div>
                    <strong>Hermes Agent</strong>
                    <small>online</small>
                  </div>
                </div>
                <div className="agent-chat-thread">
                  <p className="agent-bubble user">
                    Watch AI news and tell me what matters today.
                  </p>
                  <div className="agent-bubble agent">
                    <strong>Monitoring now</strong>
                    <span>12 sources checked</span>
                    <span>Model launch + workflow trend found</span>
                    <span>Noise filtered, notes saved</span>
                  </div>
                  <p className="agent-bubble user">Turn it into action.</p>
                  <div className="agent-bubble agent">
                    <strong>Agent output</strong>
                    <span>1-page brief ready</span>
                    <span>Test task created for tonight</span>
                    <span>Follow-up reminder set</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentsPage() {
  return (
    <main className="agent-page">
      <section className="agent-hero">
        <article className="agent-copy">
          <p className="eyebrow">AI agent</p>
          <h1>Custom agents for continuous learning.</h1>
          <p>
            Instead of searching from scratch every time, I build agents that
            help me track topics, research faster, and keep context moving.
          </p>
          <div className="agent-proof-list" aria-label="AI agent workflow examples">
            <span>Daily AI brief</span>
            <span>Research tracking</span>
            <span>Learning tasks</span>
            <span>Scheduled follow-ups</span>
          </div>
        </article>
        <AgentPhonePrototype />
      </section>
    </main>
  );
}

function ContactPage() {
  const contactLinks = {
    email: `mailto:${profile.contacts.email}`,
    whatsapp: "https://wa.me/85254265561",
    phone: "tel:+85254265561",
    linkedin: "https://www.linkedin.com/in/michael-cheng-962185214",
  };

  return (
    <main className="page-shell contact-page">
      <div className="page-heading">
        <p className="eyebrow">Contact</p>
        <h1>Let&apos;s connect.</h1>
      </div>
      <section className="contact-panel">
        {Object.entries(profile.contacts).map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>
            <strong>
              <a href={contactLinks[key]} rel="noreferrer" target={key === "phone" ? undefined : "_blank"}>
                {value}
              </a>
            </strong>
          </div>
        ))}
        <a className="primary" href="/assets/cheng-wing-hei-michael-cv.pdf" rel="noreferrer" target="_blank">
          {profile.cvStatus}
        </a>
      </section>
    </main>
  );
}

function AdminPage() {
  const exportData = useMemo(
    () => JSON.stringify({ profile, storyChapters, videos, automations }, null, 2),
    [],
  );

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Admin preview</p>
        <h1>A simple editing direction for later.</h1>
        <p>
          This is not the final admin panel yet. It shows the content structure
          we can turn into a CMS, Notion-backed system, or database-backed editor.
        </p>
      </div>
      <textarea className="admin-json" readOnly value={exportData} />
    </main>
  );
}

export function App() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const onHash = () => setPath(getPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.22 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  useEffect(() => {
    if (path !== "/") return undefined;

    const whyMoment = document.querySelector(".why-moment");
    if (!whyMoment) return undefined;
    let transitionWasActive = false;

    const updateWhyProgress = () => {
      const rect = whyMoment.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      const transitionActive = progress > 0.62;
      const hazeOpacity = transitionActive ? 0 : 1;
      const glowOpacity = transitionActive ? 0 : 1;
      const copyFadeIn = 1;
      const copyFadeOut = transitionActive ? Math.max(1 - (progress - 0.62) / 0.1, 0) : 1;
      const copyOpacity = copyFadeIn * copyFadeOut;
      const transitionOpacity = transitionActive ? Math.min(Math.max((progress - 0.62) / 0.08, 0), 1) : 0;
      const visualShadeOpacity = 1 - hazeOpacity * 0.42;
      const copyOffset = transitionActive ? -(progress - 0.62) * 140 : 0;
      const loopVideo = whyMoment.querySelector(".why-visual video:not(.why-transition-video)");
      const transitionVideo = whyMoment.querySelector(".why-transition-video");

      if (transitionActive && !transitionWasActive) {
        loopVideo?.pause();
        if (transitionVideo) {
          transitionVideo.currentTime = 0;
          transitionVideo.playbackRate = 1.38;
          transitionVideo.play().catch(() => {});
        }
      }

      if (!transitionActive && transitionWasActive) {
        transitionVideo?.pause();
        if (transitionVideo) transitionVideo.currentTime = 0;
        loopVideo?.play().catch(() => {});
        document.body.classList.remove("handoff-previewing");
        document.body.classList.remove("handoff-committing");
        document.body.classList.remove("handoff-landed");
        document.body.classList.remove("transition-locked");
      }

      transitionWasActive = transitionActive;

      whyMoment.style.setProperty("--why-progress", progress.toFixed(3));
      whyMoment.style.setProperty("--why-haze-opacity", hazeOpacity.toFixed(3));
      whyMoment.style.setProperty("--why-glow-opacity", glowOpacity.toFixed(3));
      whyMoment.style.setProperty("--why-copy-opacity", copyOpacity.toFixed(3));
      whyMoment.style.setProperty("--why-transition-opacity", transitionOpacity.toFixed(3));
      whyMoment.style.setProperty("--why-visual-shade-opacity", visualShadeOpacity.toFixed(3));
      whyMoment.style.setProperty("--why-copy-y", `${copyOffset.toFixed(1)}px`);
      whyMoment.classList.toggle("story-visible", copyOpacity > 0.02);
    };

    updateWhyProgress();
    window.addEventListener("scroll", updateWhyProgress, { passive: true });
    window.addEventListener("resize", updateWhyProgress);

    return () => {
      window.removeEventListener("scroll", updateWhyProgress);
      window.removeEventListener("resize", updateWhyProgress);
    };
  }, [path]);

  useEffect(() => {
    if (path !== "/") return undefined;

    const scrollToWhyStory = () => {
      const whyMoment = document.querySelector(".why-moment");
      if (!whyMoment) return;

      const html = document.documentElement;
      const previousScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const targetTop = whyMoment.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetTop, behavior: "auto" });
      html.style.scrollBehavior = previousScrollBehavior;
    };

    const blockTransitionScroll = (event) => {
      if (!document.body.classList.contains("transition-locked")) return;
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      const lockedKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (document.body.classList.contains("transition-locked") && lockedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    const handleCreativeReverse = (event) => {
      if (document.body.classList.contains("transition-locked")) return;
      if (event.deltaY >= 0) return;

      const creativeChapter = document.querySelector(".creative-chapter");
      if (!creativeChapter) return;

      const rect = creativeChapter.getBoundingClientRect();
      const isAtCreativeStart = rect.top > -8 && rect.top < window.innerHeight * 0.55;
      if (!isAtCreativeStart) return;

      event.preventDefault();
      scrollToWhyStory();
    };

    window.addEventListener("wheel", blockTransitionScroll, { passive: false });
    window.addEventListener("touchmove", blockTransitionScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleCreativeReverse, { passive: false });

    return () => {
      window.removeEventListener("wheel", blockTransitionScroll);
      window.removeEventListener("touchmove", blockTransitionScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleCreativeReverse);
      document.body.classList.remove("transition-locked");
    };
  }, [path]);

  const route = routes[path] || "home";

  return (
    <>
      <Header path={path} />
      <div className="grain" />
      <div className="scene-fade" aria-hidden="true" />
      <div className="creative-handoff" aria-hidden="true">
        <CreativeScene chapter={storyChapters[0]} overlay />
      </div>
      {route === "home" && <Home />}
      {route === "video" && <VideoPage />}
      {route === "automation" && <AutomationPage />}
      {route === "website" && <WebsitePage />}
      {route === "agents" && <AgentsPage />}
      {route === "contact" && <ContactPage />}
      {route === "admin" && <AdminPage />}
      <footer>
        <button onClick={() => navigate("/admin")} type="button">
          Admin preview
        </button>
        <span>Michael / built with AI, shaped with taste.</span>
      </footer>
    </>
  );
}
