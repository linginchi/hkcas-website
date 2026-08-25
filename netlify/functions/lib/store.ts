import { connectLambda, getStore, type Store } from "@netlify/blobs";
import type { HandlerEvent } from "@netlify/functions";
import type { PaymentRecord } from "../../../shared/payments.ts";

const STORE = "hkcas-payments";

function resolveStore(event?: HandlerEvent): Store {
  const blobsContext = (event as { blobs?: string } | undefined)?.blobs;
  if (blobsContext) {
    connectLambda(event as { blobs: string; headers: Record<string, string> });
    return getStore(STORE);
  }

  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
  if (siteID && token) {
    return getStore({ name: STORE, siteID, token });
  }

  return getStore(STORE);
}

export async function savePayment(
  record: PaymentRecord,
  event?: HandlerEvent,
): Promise<void> {
  const store = resolveStore(event);
  await store.setJSON(record.id, record);
}

export async function getPayment(
  id: string,
  event?: HandlerEvent,
): Promise<PaymentRecord | null> {
  const store = resolveStore(event);
  const record = await store.get(id, { type: "json" });
  return (record as PaymentRecord | null) ?? null;
}

export async function updatePayment(
  id: string,
  patch: Partial<PaymentRecord>,
  event?: HandlerEvent,
): Promise<PaymentRecord | null> {
  const current = await getPayment(id, event);
  if (!current) return null;
  const next: PaymentRecord = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await savePayment(next, event);
  return next;
}
