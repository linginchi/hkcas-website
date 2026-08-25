import type { Handler } from "@netlify/functions";
import { verifyStaffPassword } from "../../shared/payments.ts";
import { STAFF_COOKIE, staffCookieValue } from "./lib/auth.ts";
import { json, requestBody } from "./lib/http.ts";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const secret = process.env.STAFF_GATE_SECRET;
  if (!secret) {
    return json(500, { error: "STAFF_GATE_SECRET is not configured" });
  }

  let payload: { password?: string } = {};
  try {
    payload = JSON.parse(requestBody(event) || "{}") as { password?: string };
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  if (!verifyStaffPassword(payload.password || "", secret)) {
    return json(401, { error: "Unauthorized" });
  }

  const secure = (event.headers["x-forwarded-proto"] || "https") === "https";
  const cookie = `${STAFF_COOKIE}=${staffCookieValue(secret)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${
    secure ? "; Secure" : ""
  }`;

  return json(200, { ok: true }, { "Set-Cookie": cookie });
};
