# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Locked Prototype Decisions

- AI Automation page case study: present a "one-command AI content production system" where one prompt generates research, content ideas, social materials, captions, image direction/output, and a Notion review page. Position as automated content package generation with human review, not fully automatic publishing.
- AI Agent page direction: use a left-copy/right-visual layout with a CSS 3D phone prototype showing a Telegram AI agent conversation. The phone should accept a future screen recording by setting `agentDemoVideoSrc` in `src/App.jsx`.
