import type { Handler } from "@netlify/functions";
import { validatePublicDonation } from "../../shared/payments.ts";
import { startCheckout } from "./lib/checkout.ts";
import { json, requestBody } from "./lib/http.ts";

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

  const parsed = validatePublicDonation(raw);
  if (!parsed.ok) {
    return json(400, { error: parsed.error });
  }

  try {
    const { record, checkoutUrl, origin } = await startCheckout(event, parsed.value);
    return json(200, {
      id: record.id,
      checkoutUrl,
      siteUrl: `${origin}/pay/${record.id}`,
      currency: record.currency,
      amount: parsed.value.amount,
      purpose: parsed.value.purpose,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe error";
    return json(502, { error: message });
  }
};
