import { createServer } from "node:http";
import { appendFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CAMPAIGN_REDIRECTS,
  CAMPAIGN_REDIRECT_STATUS,
  campaignRedirectResponse,
  type VisitLog,
} from "./campaign-redirects.ts";

const TARGET =
  "https://events.bagevent.io/events/ZMkcAsXkzm?salesCode=QRDVTDAAYEFMJAUWY2T9DYWTH3JR5JPE&src=HKCAS";

describe("campaign redirects", () => {
  it("keeps the printed AHKETC target in one config entry", () => {
    expect(CAMPAIGN_REDIRECTS.ahket1217).toBe(TARGET);
  });

  it("logs the visit and returns that URL as Location", async () => {
    const lines: string[] = [];
    let persisted: VisitLog | null = null;
    const response = campaignRedirectResponse(
      new Request("https://hkcas.org/r/ahket1217?extra=1", {
        headers: {
          "user-agent": "HKCAS-Test/1.0",
          "x-forwarded-for": "203.0.113.8, 10.0.0.1",
        },
      }),
      {
        now: () => new Date("2026-11-22T03:00:00.000Z"),
        log: (line) => lines.push(line),
        persist: async (entry) => {
          persisted = entry;
        },
      },
    );

    expect(response.status).toBe(CAMPAIGN_REDIRECT_STATUS);
    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe(TARGET);
    expect(lines).toHaveLength(1);
    const logged = JSON.parse(lines[0]) as VisitLog;
    expect(logged).toEqual({
      ts: "2026-11-22T03:00:00.000Z",
      path: "/r/ahket1217",
      ip: "203.0.113.8",
      ua: "HKCAS-Test/1.0",
    });
    expect(persisted).toEqual(logged);
  });

  it("prefers the platform client IP over a forwarded header", () => {
    const lines: string[] = [];
    campaignRedirectResponse(
      new Request("https://hkcas.org/r/ahket1217", {
        method: "HEAD",
        headers: {
          "user-agent": "curl/8.7.1",
          "x-forwarded-for": "198.51.100.1",
        },
      }),
      {
        ip: "203.0.113.20",
        now: () => new Date("2026-11-22T03:05:00.000Z"),
        log: (line) => lines.push(line),
      },
    );
    expect(JSON.parse(lines[0])).toMatchObject({
      ip: "203.0.113.20",
      ua: "curl/8.7.1",
      path: "/r/ahket1217",
    });
  });

  it("does not let other paths or methods through", () => {
    const lines: string[] = [];
    const log = (line: string) => lines.push(line);
    expect(campaignRedirectResponse(new Request("https://hkcas.org/"), { log }).status).toBe(404);
    expect(
      campaignRedirectResponse(new Request("https://hkcas.org/r/other"), { log }).status,
    ).toBe(404);
    expect(
      campaignRedirectResponse(new Request("https://hkcas.org/r/ahket1217/more"), { log }).status,
    ).toBe(404);
    const post = campaignRedirectResponse(
      new Request("https://hkcas.org/r/ahket1217", { method: "POST" }),
      { log },
    );
    expect(post.status).toBe(405);
    expect(lines).toHaveLength(0);
  });

  it("writes a visit line before the 301 on an HTTP request", async () => {
    const dir = mkdtempSync(join(tmpdir(), "hkcas-r-"));
    const logFile = join(dir, "visits.log");
    const server = createServer((req, res) => {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === "string") headers.set(key, value);
      }
      const request = new Request(`https://hkcas.org${req.url ?? "/"}`, {
        method: req.method,
        headers,
      });
      const response = campaignRedirectResponse(request, {
        ip: "198.51.100.10",
        log: (line) => appendFileSync(logFile, `${line}\n`),
      });
      res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
      res.end();
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;

    try {
      const head = await fetch(`http://127.0.0.1:${port}/r/ahket1217`, {
        method: "HEAD",
        redirect: "manual",
        headers: { "user-agent": "curl/8.7.1" },
      });
      expect(head.status).toBe(301);
      expect(head.headers.get("location")).toBe(TARGET);
      const entry = JSON.parse(readFileSync(logFile, "utf8").trim()) as VisitLog;
      expect(entry).toMatchObject({
        path: "/r/ahket1217",
        ip: "198.51.100.10",
        ua: "curl/8.7.1",
      });
      expect(entry.ts).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    }
  });
});
