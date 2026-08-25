import { getStore } from "@netlify/blobs";
import type { PaymentRecord } from "../../../shared/payments.ts";

const STORE = "hkcas-payments";

export async function savePayment(record: PaymentRecord): Promise<void> {
  const store = getStore(STORE);
  await store.setJSON(record.id, record);
}

export async function getPayment(id: string): Promise<PaymentRecord | null> {
  const store = getStore(STORE);
  const record = await store.get(id, { type: "json" });
  return (record as PaymentRecord | null) ?? null;
}

export async function updatePayment(
  id: string,
  patch: Partial<PaymentRecord>,
): Promise<PaymentRecord | null> {
  const current = await getPayment(id);
  if (!current) return null;
  const next: PaymentRecord = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await savePayment(next);
  return next;
}
