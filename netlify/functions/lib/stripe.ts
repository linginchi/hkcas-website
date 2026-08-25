import Stripe from "stripe";

const API_VERSION = "2026-07-29.dahlia" as const;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key, { apiVersion: API_VERSION });
}
