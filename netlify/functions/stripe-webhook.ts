import type { Handler } from "@netlify/functions";
import { paymentStatusFromEvent } from "../../shared/payments.ts";
import { json, requestBody } from "./lib/http.ts";
import { updatePayment } from "./lib/store.ts";
import { getStripe } from "./lib/stripe.ts";

function paymentIdFromObject(object: {
  metadata?: { paymentId?: string };
}): string | undefined {
  return object.metadata?.paymentId;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const signature = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return json(400, { error: "Missing webhook signature" });
  }

  let stripeEvent;
  try {
    const stripe = getStripe();
    stripeEvent = await stripe.webhooks.constructEventAsync(
      requestBody(event),
      signature,
      webhookSecret,
    );
  } catch {
    return json(400, { error: "Invalid signature" });
  }

  const status = paymentStatusFromEvent(stripeEvent.type);
  if (!status) {
    return json(200, { received: true, ignored: stripeEvent.type });
  }

  const object = stripeEvent.data.object as {
    id?: string;
    metadata?: { paymentId?: string };
  };
  const paymentId = paymentIdFromObject(object);
  if (!paymentId) {
    return json(200, { received: true, unmatched: stripeEvent.type });
  }

  await updatePayment(
    paymentId,
    {
      status,
      stripeCheckoutSessionId: object.id,
    },
    event,
  );
  return json(200, { received: true, paymentId, status });
};
