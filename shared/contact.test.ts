import { describe, expect, it } from "vitest";
import { validateContact } from "./payments.ts";

describe("validateContact", () => {
  it("accepts a complete message", () => {
    const result = validateContact({
      name: "王小明",
      email: "wang@example.com",
      message: "希望了解零碳园区咨询",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects missing fields", () => {
    expect(validateContact({ name: "", email: "a@b.com", message: "hi" }).ok).toBe(false);
    expect(validateContact({ name: "A", email: "bad", message: "hi" }).ok).toBe(false);
    expect(validateContact({ name: "A", email: "a@b.com", message: "" }).ok).toBe(false);
  });
});
