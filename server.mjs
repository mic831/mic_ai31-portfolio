import { createReadStream, existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const dist = join(root, "dist");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
};

const content = {
  profile: {
    handle: "Michael",
    contacts: {
      email: "email coming soon",
      whatsapp: "WhatsApp coming soon",
      phone: "phone coming soon",
      linkedin: "LinkedIn coming soon",
    },
  },
  storyChapters: [
    "AI creative",
    "AI website",
    "AI automation",
    "AI agent",
  ],
};

function sendJson(response, body) {
  response.writeHead(200, { "content-type": types[".json"] });
  response.end(JSON.stringify(body, null, 2));
}

function sendFile(response, filePath) {
  const type = types[extname(filePath)] || "application/octet-stream";
  response.writeHead(200, { "content-type": type });
  createReadStream(filePath).pipe(response);
}

createServer((request, response) => {
  const url = new URL(request.url, `http://localhost:${port}`);

  if (url.pathname === "/api/content") {
    sendJson(response, content);
    return;
  }

  const requested = normalize(url.pathname === "/" ? "/index.html" : url.pathname);
  let filePath = join(dist, requested);

  if (!filePath.startsWith(dist) || !existsSync(filePath)) {
    filePath = join(dist, "index.html");
  }

  if (!existsSync(filePath)) {
    response.writeHead(503, { "content-type": "text/plain; charset=utf-8" });
    response.end("Build the frontend first with npm run build.");
    return;
  }

  sendFile(response, filePath);
}).listen(port, "127.0.0.1", () => {
  const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  console.log(`${packageJson.name} running at http://127.0.0.1:${port}`);
});
