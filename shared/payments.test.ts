import { describe, expect, it } from "vitest";
import {
  PUBLIC_DONATION_AMOUNT_HKD,
  buildCheckoutSessionParams,
  paymentStatusFromEvent,
  randomIntegrationSuffix,
  regionCurrency,
  toStripeAmount,
  validateCreatePayment,
  validatePublicDonation,
  verifyStaffCookie,
  verifyStaffPassword,
  staffCookieValue,
} from "./payments.ts";

describe("validateCreatePayment", () => {
  it("accepts a complete overseas request", () => {
    const result = validateCreatePayment({
      customerName: "Alex Chen",
      customerEmail: "alex@example.com",
      amount: 12800,
      region: "overseas",
      description: "Green park consulting",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.amount).toBe(12800);
      expect(result.value.region).toBe("overseas");
      expect(result.value.purpose).toBe("consultation");
    }
  });

  it("defaults missing purpose to consultation and accepts donation", () => {
    const consultation = validateCreatePayment({
      customerName: "Alex Chen",
      customerEmail: "alex@example.com",
      amount: 12800,
      region: "overseas",
      description: "Green park consulting",
    });
    expect(consultation.ok).toBe(true);

    const donation = validateCreatePayment({
      customerName: "Alex Chen",
      customerEmail: "alex@example.com",
      amount: 500,
      region: "overseas",
      purpose: "donation",
      description: "Annual donation",
    });
    expect(donation.ok).toBe(true);
    if (donation.ok) expect(donation.value.purpose).toBe("donation");
  });

  it("locks public donations to HKD 1000 regardless of client amount", () => {
    const result = validatePublicDonation({
      name: "Donor",
      email: "donor@example.com",
      amount: 1,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.amount).toBe(PUBLIC_DONATION_AMOUNT_HKD);
      expect(result.value.purpose).toBe("donation");
      expect(result.value.region).toBe("overseas");
    }
  });

  it("rejects invalid email, zero amount, and unknown region", () => {
    expect(validateCreatePayment({
      customerName: "Alex",
      customerEmail: "not-an-email",
      amount: 100,
      region: "overseas",
      description: "Fee",
    }).ok).toBe(false);

    expect(validateCreatePayment({
      customerName: "Alex",
      customerEmail: "alex@example.com",
      amount: 0,
      region: "china",
      description: "Fee",
    }).ok).toBe(false);

    expect(validateCreatePayment({
      customerName: "Alex",
      customerEmail: "alex@example.com",
      amount: 100,
      region: "eu",
      description: "Fee",
    }).ok).toBe(false);
  });
});

describe("region and amount", () => {
  it("maps overseas to HKD and china to CNY in minor units", () => {
    expect(regionCurrency("overseas")).toBe("hkd");
    expect(regionCurrency("china")).toBe("cny");
    expect(toStripeAmount(12800.5)).toBe(1280050);
  });
});

describe("buildCheckoutSessionParams", () => {
  const input = {
    customerName: "Li Wei",
    customerEmail: "li@example.com",
    amount: 8000,
    region: "china" as const,
    purpose: "consultation" as const,
    description: "并购咨询费",
  };

  it("creates a CNY session for china without payment_method_types", () => {
    const params = buildCheckoutSessionParams({
      paymentId: "pay_1",
      input,
      siteUrl: "https://hkcas.org",
      pmcChina: "pmc_china",
      integrationSuffix: "abcdefgh",
    });

    expect(params.mode).toBe("payment");
    expect(params.line_items?.[0]).toMatchObject({
      quantity: 1,
      price_data: {
        currency: "cny",
        unit_amount: 800000,
        product_data: { name: "HKCAS 咨询费" },
      },
    });
    expect(params.payment_method_configuration).toBe("pmc_china");
    expect(params).not.toHaveProperty("payment_method_types");
    expect(params.integration_identifier).toBe("hkcas-consult-abcdefgh");
    expect(params.customer_email).toBe("li@example.com");
    expect(params.metadata).toMatchObject({
      paymentId: "pay_1",
      region: "china",
      purpose: "consultation",
      customerName: "Li Wei",
    });
    expect(params.payment_intent_data.metadata.paymentId).toBe("pay_1");
    expect(params.success_url).toContain("/pay/success?purpose=consultation");
    expect(params.cancel_url).toContain("/pay/cancel?id=pay_1");
  });

  it("uses the Stripe Donation catalog price for HKD 1000 public gifts", () => {
    const params = buildCheckoutSessionParams({
      paymentId: "pay_3",
      input: {
        ...input,
        purpose: "donation",
        region: "overseas",
        amount: 1000,
        description: "HKCAS donation HKD 1000",
      },
      siteUrl: "https://hkcas.org",
      donationPriceId: "price_1U8WTo4HKHE36SPecSp13et7",
      integrationSuffix: "qrstuvwx",
    });

    expect(params.line_items?.[0]).toEqual({
      quantity: 1,
      price: "price_1U8WTo4HKHE36SPecSp13et7",
    });
    expect(params.line_items?.[0]).not.toHaveProperty("price_data");
    expect(params.metadata.purpose).toBe("donation");
    expect(params.integration_identifier).toBe("hkcas-donate-qrstuvwx");
    expect(params.success_url).toContain("/pay/success?purpose=donation");
  });

  it("creates an HKD overseas session using the overseas configuration", () => {
    const params = buildCheckoutSessionParams({
      paymentId: "pay_2",
      input: { ...input, region: "overseas", description: "Advisory fee" },
      siteUrl: "https://hkcas.org",
      pmcOverseas: "pmc_os",
      integrationSuffix: "ijklmnop",
    });

    expect(params.line_items?.[0]).toMatchObject({
      price_data: { currency: "hkd", unit_amount: 800000 },
    });
    expect(params.payment_method_configuration).toBe("pmc_os");
    expect(params).not.toHaveProperty("payment_method_types");
  });
});

describe("webhooks and staff auth", () => {
  it("maps Stripe events to payment status", () => {
    expect(paymentStatusFromEvent("checkout.session.completed")).toBe("paid");
    expect(paymentStatusFromEvent("checkout.session.expired")).toBe("expired");
    expect(paymentStatusFromEvent("payment_intent.payment_failed")).toBe("failed");
    expect(paymentStatusFromEvent("customer.created")).toBeNull();
  });

  it("issues and verifies a staff cookie with timing-safe compare", () => {
    const secret = "super-secret-gate";
    const cookie = staffCookieValue(secret);
    expect(verifyStaffCookie(cookie, secret)).toBe(true);
    expect(verifyStaffCookie("tampered", secret)).toBe(false);
    expect(verifyStaffPassword(secret, secret)).toBe(true);
    expect(verifyStaffPassword("wrong", secret)).toBe(false);
  });

  it("makes an 8-letter integration suffix", () => {
    expect(randomIntegrationSuffix()).toMatch(/^[a-z]{8}$/);
  });
});
