import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export type Region = "overseas" | "china";
export type PaymentPurpose = "consultation" | "donation";

export type CreatePaymentInput = {
  customerName: string;
  customerEmail: string;
  amount: number;
  region: Region;
  purpose: PaymentPurpose;
  description: string;
};

export type PaymentStatus = "pending" | "paid" | "expired" | "failed";

export type PaymentRecord = CreatePaymentInput & {
  id: string;
  currency: "hkd" | "cny";
  amountMinor: number;
  status: PaymentStatus;
  stripeCheckoutSessionId?: string;
  checkoutUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type CheckoutSessionParams = {
  mode: "payment";
  customer_email: string;
  line_items: Array<{
    quantity: number;
    price?: string;
    price_data?: {
      currency: string;
      unit_amount: number;
      product_data: { name: string; description?: string };
    };
  }>;
  success_url: string;
  cancel_url: string;
  metadata: Record<string, string>;
  payment_method_configuration?: string;
  integration_identifier: string;
  locale?: string;
  payment_intent_data: {
    metadata: Record<string, string>;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STAFF_COOKIE_PAYLOAD = "hkcas-staff-ok";

export const PUBLIC_DONATION_AMOUNT_HKD = 1000;
export const PUBLIC_DONATION_PRICE_ID = "price_1U8WTo4HKHE36SPecSp13et7";

export function validateCreatePayment(
  input: unknown,
): { ok: true; value: CreatePaymentInput } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "请求体无效" };
  }
  const body = input as Record<string, unknown>;
  const customerName = typeof body.customerName === "string" ? body.customerName.trim() : "";
  const customerEmail = typeof body.customerEmail === "string" ? body.customerEmail.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const region = body.region;
  const purpose = body.purpose === undefined ? "consultation" : body.purpose;
  const amount = typeof body.amount === "number" ? body.amount : Number(body.amount);

  if (customerName.length < 1 || customerName.length > 120) {
    return { ok: false, error: "请填写客户姓名" };
  }
  if (!EMAIL_RE.test(customerEmail)) {
    return { ok: false, error: "请填写有效邮箱" };
  }
  if (!Number.isFinite(amount) || amount < 1) {
    return { ok: false, error: "金额必须大于或等于 1" };
  }
  if (region !== "overseas" && region !== "china") {
    return { ok: false, error: "请选择境外或境内" };
  }
  if (purpose !== "consultation" && purpose !== "donation") {
    return { ok: false, error: "请选择咨询费或捐款" };
  }
  if (description.length < 1 || description.length > 500) {
    return { ok: false, error: "请填写说明" };
  }

  return {
    ok: true,
    value: { customerName, customerEmail, amount, region, purpose, description },
  };
}

export function validatePublicDonation(
  input: unknown,
): { ok: true; value: CreatePaymentInput } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "请求体无效" };
  }
  const body = input as Record<string, unknown>;
  return validateCreatePayment({
    customerName: body.customerName ?? body.name,
    customerEmail: body.customerEmail ?? body.email,
    amount: PUBLIC_DONATION_AMOUNT_HKD,
    region: "overseas",
    purpose: "donation",
    description: "HKCAS donation HKD 1000",
  });
}

export function checkoutProductName(purpose: PaymentPurpose, region: Region): string {
  if (purpose === "donation") {
    return region === "china" ? "HKCAS 捐赠" : "HKCAS donation";
  }
  return region === "china" ? "HKCAS 咨询费" : "HKCAS consultation fee";
}

export function regionCurrency(region: Region): "hkd" | "cny" {
  return region === "china" ? "cny" : "hkd";
}

export function toStripeAmount(amount: number): number {
  return Math.round(amount * 100);
}

export function randomIntegrationSuffix(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const bytes = randomBytes(8);
  let out = "";
  for (let i = 0; i < 8; i += 1) {
    out += alphabet[bytes[i] % alphabet.length];
  }
  return out;
}

export function usesCatalogDonationPrice(
  input: CreatePaymentInput,
  donationPriceId?: string,
): boolean {
  return Boolean(
    donationPriceId &&
      input.purpose === "donation" &&
      input.region === "overseas" &&
      input.amount === PUBLIC_DONATION_AMOUNT_HKD,
  );
}

export function buildCheckoutSessionParams(opts: {
  paymentId: string;
  input: CreatePaymentInput;
  siteUrl: string;
  pmcOverseas?: string;
  pmcChina?: string;
  donationPriceId?: string;
  integrationSuffix?: string;
}): CheckoutSessionParams {
  const currency = regionCurrency(opts.input.region);
  const suffix = opts.integrationSuffix ?? randomIntegrationSuffix();
  const siteUrl = opts.siteUrl.replace(/\/$/, "");
  const pmc =
    opts.input.region === "china" ? opts.pmcChina : opts.pmcOverseas;
  const catalogPrice = usesCatalogDonationPrice(opts.input, opts.donationPriceId);

  const params: CheckoutSessionParams = {
    mode: "payment",
    customer_email: opts.input.customerEmail,
    line_items: [
      catalogPrice
        ? { quantity: 1, price: opts.donationPriceId }
        : {
            quantity: 1,
            price_data: {
              currency,
              unit_amount: toStripeAmount(opts.input.amount),
              product_data: {
                name: checkoutProductName(opts.input.purpose, opts.input.region),
                description: opts.input.description,
              },
            },
          },
    ],
    success_url: `${siteUrl}/pay/success?purpose=${opts.input.purpose}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pay/cancel?id=${encodeURIComponent(opts.paymentId)}`,
    metadata: {
      paymentId: opts.paymentId,
      region: opts.input.region,
      purpose: opts.input.purpose,
      customerName: opts.input.customerName,
      description: opts.input.description.slice(0, 450),
    },
    integration_identifier: `hkcas-${opts.input.purpose === "donation" ? "donate" : "consult"}-${suffix}`,
    locale: opts.input.region === "china" ? "zh" : "auto",
    payment_intent_data: {
      metadata: {
        paymentId: opts.paymentId,
        region: opts.input.region,
        purpose: opts.input.purpose,
      },
    },
  };

  if (pmc) {
    params.payment_method_configuration = pmc;
  }

  return params;
}

export function paymentStatusFromEvent(type: string): PaymentStatus | null {
  if (type === "checkout.session.completed") return "paid";
  if (type === "checkout.session.expired") return "expired";
  if (type === "payment_intent.payment_failed") return "failed";
  return null;
}

export function staffCookieValue(secret: string): string {
  return createHmac("sha256", secret).update(STAFF_COOKIE_PAYLOAD).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyStaffCookie(cookie: string | undefined, secret: string): boolean {
  if (!cookie || !secret) return false;
  return safeEqual(cookie, staffCookieValue(secret));
}

export function verifyStaffPassword(password: string, secret: string): boolean {
  if (!password || !secret) return false;
  return safeEqual(password, secret);
}

export function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").map((part) => {
      const [key, ...rest] = part.trim().split("=");
      return [key, decodeURIComponent(rest.join("="))];
    }),
  );
}

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export function validateContact(
  input: unknown,
): { ok: true; value: ContactInput } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "请求体无效" };
  }
  const body = input as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 1 || name.length > 120) {
    return { ok: false, error: "请填写姓名" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "请填写有效邮箱" };
  }
  if (message.length < 1 || message.length > 4000) {
    return { ok: false, error: "请填写留言内容" };
  }
  return { ok: true, value: { name, email, message } };
}
