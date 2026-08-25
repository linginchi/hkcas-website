import type { Handler } from "@netlify/functions";
import { json } from "./lib/http.ts";
import { getPayment } from "./lib/store.ts";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  const id = event.queryStringParameters?.id;
  if (!id) {
    return json(400, { error: "Missing id" });
  }

  const record = await getPayment(id, event);
  if (!record) {
    return json(404, { error: "Not found" });
  }

  return json(200, {
    id: record.id,
    status: record.status,
    checkoutUrl: record.checkoutUrl,
    currency: record.currency,
    amount: record.amount,
  });
};
