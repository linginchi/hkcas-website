/**
 * 已印在海報與邀請函上的報名短鏈。路徑鍵名上線後不可改。
 * 目標網址只在這裡修改，Location 會原樣帶上查詢參數。
 */
export const CAMPAIGN_REDIRECTS: Readonly<Record<string, string>> = {
  ahket1217:
    "https://events.bagevent.io/events/ZMkcAsXkzm?salesCode=QRDVTDAAYEFMJAUWY2T9DYWTH3JR5JPE&src=HKCAS",
};

export const CAMPAIGN_REDIRECT_STATUS = 301;

export type VisitLog = {
  ts: string;
  path: string;
  ip: string;
  ua: string;
};

export type CampaignRedirectContext = {
  ip?: string;
  log?: (line: string) => void;
  persist?: (entry: VisitLog) => Promise<void>;
  waitUntil?: (promise: Promise<unknown>) => void;
  now?: () => Date;
};

export function campaignTargetForPath(pathname: string): string | null {
  const match = /^\/r\/([^/]+)\/?$/.exec(pathname);
  if (!match) return null;
  let slug = match[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    return null;
  }
  if (!Object.hasOwn(CAMPAIGN_REDIRECTS, slug)) return null;
  return CAMPAIGN_REDIRECTS[slug];
}

export function visitLogLine(entry: VisitLog): string {
  return JSON.stringify(entry);
}

function clientIp(headers: Headers): string {
  const netlifyIp = headers.get("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp.trim();
  const forwarded = headers.get("x-forwarded-for");
  if (!forwarded) return "";
  return forwarded.split(",")[0]?.trim() ?? "";
}

function textResponse(
  status: number,
  body: string,
  extra: Record<string, string> = {},
): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      ...extra,
    },
  });
}

export function campaignRedirectResponse(
  request: Request,
  context: CampaignRedirectContext = {},
): Response {
  let pathname = "/";
  try {
    pathname = new URL(request.url).pathname;
  } catch {
    return textResponse(404, "Not found");
  }

  const target = campaignTargetForPath(pathname);
  if (!target) return textResponse(404, "Not found");
  if (request.method !== "GET" && request.method !== "HEAD") {
    return textResponse(405, "Method not allowed", { Allow: "GET, HEAD" });
  }

  const path = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const entry: VisitLog = {
    ts: (context.now ?? (() => new Date()))().toISOString(),
    path,
    ip: context.ip?.trim() || clientIp(request.headers),
    ua: request.headers.get("user-agent") ?? "",
  };
  try {
    (context.log ?? console.log)(visitLogLine(entry));
  } catch {
    // 記日誌失敗時仍要跳轉。
  }

  if (context.persist) {
    const job = context.persist(entry).catch((error: unknown) => {
      const name = error instanceof Error ? error.name : "Error";
      try {
        (context.log ?? console.error)(
          JSON.stringify({ path: entry.path, ts: entry.ts, logError: name }),
        );
      } catch {
        // 跳轉優先於日誌。
      }
    });
    context.waitUntil?.(job);
  }

  return new Response(null, {
    status: CAMPAIGN_REDIRECT_STATUS,
    headers: {
      Location: target,
      "Cache-Control": "no-store",
      "Netlify-CDN-Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
