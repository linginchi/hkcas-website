import type { Handler } from "@netlify/functions";
import { validateContact } from "../../shared/payments.ts";
import { json, requestBody } from "./lib/http.ts";

const TO = "contact@hkcas.org";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(requestBody(event) || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const parsed = validateContact(raw);
  if (!parsed.ok) {
    return json(400, { error: parsed.error, ok: false });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return json(500, { error: "RESEND_API_KEY is not configured", ok: false });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "HKCAS Website <noreply@hkcas.org>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [TO],
      reply_to: parsed.value.email,
      subject: `HKCAS 网站留言：${parsed.value.name}`,
      text: [
        `姓名: ${parsed.value.name}`,
        `邮箱: ${parsed.value.email}`,
        "",
        parsed.value.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return json(502, { ok: false, error: `Email provider error: ${detail.slice(0, 200)}` });
  }

  return json(200, { ok: true });
};
