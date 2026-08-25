import type { Handler } from "@netlify/functions";
import { isStaff } from "./lib/auth.ts";
import { json } from "./lib/http.ts";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }
  if (!isStaff(event)) {
    return json(401, { ok: false });
  }
  return json(200, { ok: true });
};
