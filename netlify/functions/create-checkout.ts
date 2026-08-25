import { randomBytes } from "node:crypto";
import type { Handler } from "@netlify/functions";
import {
  buildCheckoutSessionParams,
  regionCurrency,
  toStripeAmount,
  validateCreatePayment,
  type PaymentRecord,
} from "../../shared/payments.ts";
import { json, requestBody, siteUrl } from "./lib/http.ts";
import { savePayment } from "./lib/store.ts";
import { getStripe } from "./lib/stripe.ts";
import { isStaff } from "./lib/auth.ts";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }
  if (!isStaff(event)) {
    return json(401, { error: "Unauthorized" });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(requestBody(event) || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const parsed = validateCreatePayment(raw);
  if (!parsed.ok) {
    return json(400, { error: parsed.error });
  }

  const origin = siteUrl(event);
  const paymentId = `pay_${randomBytes(8).toString("hex")}`;
  const now = new Date().toISOString();
  const record: PaymentRecord = {
    ...parsed.value,
    id: paymentId,
    currency: regionCurrency(parsed.value.region),
    amountMinor: toStripeAmount(parsed.value.amount),
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const params = buildCheckoutSessionParams({
    paymentId,
    input: parsed.value,
    siteUrl: origin,
    pmcOverseas: process.env.STRIPE_PMC_OVERSEAS,
    pmcChina: process.env.STRIPE_PMC_CHINA,
  });

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create(
      params as unknown as Parameters<typeof stripe.checkout.sessions.create>[0],
    );
    record.stripeCheckoutSessionId = session.id;
    record.checkoutUrl = session.url ?? undefined;
    await savePayment(record, event);

    if (!session.url) {
      return json(502, { error: "Stripe did not return a checkout URL" });
    }

    return json(200, {
      id: paymentId,
      checkoutUrl: session.url,
      siteUrl: `${origin}/pay/${paymentId}`,
      currency: record.currency,
      amount: parsed.value.amount,
    });
  } catch (error) {
    await savePayment(record, event);
    const message = error instanceof Error ? error.message : "Stripe error";
    return json(502, { error: message });
  }
};
