import type { HandlerResponse } from "@netlify/functions";

export function json(
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {},
): HandlerResponse {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

export function siteUrl(event: { headers: Record<string, string | undefined> }): string {
  return (
    process.env.URL ||
    process.env.SITE_URL ||
    `${event.headers["x-forwarded-proto"] || "https"}://${event.headers.host}`
  );
}

export function requestBody(event: {
  body: string | null;
  isBase64Encoded?: boolean;
}): string {
  if (!event.body) return "";
  return event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
}
