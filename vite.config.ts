import { appendFileSync, mkdirSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { campaignRedirectResponse } from "./shared/campaign-redirects.ts";

function campaignRedirectDevPlugin(): Plugin {
  return {
    name: "hkcas-campaign-redirect",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? "").split("?")[0] ?? "";
        if (pathname !== "/r" && !pathname.startsWith("/r/")) {
          next();
          return;
        }
        void writeCampaignRedirect(req, res);
      });
    },
  };
}

async function writeCampaignRedirect(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers.set(key, value);
    else if (Array.isArray(value)) headers.set(key, value.join(", "));
  }
  const request = new Request(`http://${req.headers.host ?? "localhost"}${req.url ?? "/"}`, {
    method: req.method ?? "GET",
    headers,
  });
  const response = campaignRedirectResponse(request, {
    ip: req.socket.remoteAddress ?? "",
    log: (line) => {
      console.log(line);
      mkdirSync("tmp", { recursive: true });
      appendFileSync("tmp/campaign-visits.log", `${line}\n`);
    },
  });
  res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  res.end(await response.text());
}

export default defineConfig({
  plugins: [campaignRedirectDevPlugin(), react()],
  test: {
    environment: "node",
    include: ["shared/**/*.test.ts", "netlify/**/*.test.ts"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true,
      },
    },
  },
});
