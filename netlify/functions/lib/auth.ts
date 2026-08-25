import { parseCookies, staffCookieValue, verifyStaffCookie } from "../../../shared/payments.ts";

export const STAFF_COOKIE = "hkcas_staff";

export function isStaff(event: { headers: Record<string, string | undefined> }): boolean {
  const secret = process.env.STAFF_GATE_SECRET;
  if (!secret) return false;
  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie);
  return verifyStaffCookie(cookies[STAFF_COOKIE], secret);
}

export { staffCookieValue };
