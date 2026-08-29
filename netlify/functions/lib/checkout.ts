import { randomBytes } from "node:crypto";
import type { HandlerEvent } from "@netlify/functions";
import {
  buildCheckoutSessionParams,
  regionCurrency,
  toStripeAmount,
  type CreatePaymentInput,
  type PaymentRecord,
} from "../../../shared/payments.ts";
import { siteUrl } from "./http.ts";
import { savePayment } from "./store.ts";
import { getStripe } from "./stripe.ts";

export async function startCheckout(
  event: HandlerEvent,
  input: CreatePaymentInput,
): Promise<{ record: PaymentRecord; checkoutUrl: string; origin: string }> {
  const origin = siteUrl(event);
  const paymentId = `pay_${randomBytes(8).toString("hex")}`;
  const now = new Date().toISOString();
  const record: PaymentRecord = {
    ...input,
    id: paymentId,
    currency: regionCurrency(input.region),
    amountMinor: toStripeAmount(input.amount),
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const params = buildCheckoutSessionParams({
    paymentId,
    input,
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
      throw new Error("Stripe did not return a checkout URL");
    }

    return { record, checkoutUrl: session.url, origin };
  } catch (error) {
    await savePayment(record, event);
    throw error;
  }
}
