import { describe, expect, it } from "vitest";
import Stripe from "stripe";
import type { HandlerEvent } from "@netlify/functions";
import { handler } from "./stripe-webhook.ts";

function signedEvent(type: string, metadata: Record<string, string> = {}) {
  const secret = "whsec_test_secret";
  const payload = JSON.stringify({
    id: "evt_test_webhook",
    object: "event",
    type,
    data: {
      object: {
        id: "cs_test_webhook",
        object: "checkout.session",
        metadata,
      },
    },
  });
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  return { payload, signature, secret };
}

describe("stripe webhook handler", () => {
  it("accepts a signed unmatched event without STRIPE_SECRET_KEY", async () => {
    const previousKey = process.env.STRIPE_SECRET_KEY;
    const previousSecret = process.env.STRIPE_WEBHOOK_SECRET;
    delete process.env.STRIPE_SECRET_KEY;
    const { payload, signature, secret } = signedEvent("checkout.session.expired");
    process.env.STRIPE_WEBHOOK_SECRET = secret;

    try {
      const result = await handler({
        httpMethod: "POST",
        headers: { "stripe-signature": signature },
        body: payload,
      } as HandlerEvent);

      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.body ?? "{}")).toMatchObject({
        received: true,
        unmatched: "checkout.session.expired",
      });
    } finally {
      if (previousKey === undefined) delete process.env.STRIPE_SECRET_KEY;
      else process.env.STRIPE_SECRET_KEY = previousKey;
      if (previousSecret === undefined) delete process.env.STRIPE_WEBHOOK_SECRET;
      else process.env.STRIPE_WEBHOOK_SECRET = previousSecret;
    }
  });
});
