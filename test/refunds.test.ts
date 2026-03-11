import { describe, it, expect } from "vitest";
import { refunds } from "./setup.js";

describe("refunds", () => {
  it("create returns a refund", async () => {
    const refund = await refunds.create({ paymentId: "pay_123" });
    expect(refund.id).toBe("ref_123");
    expect(refund.status).toBe("succeeded");
  });

  it("get returns a refund by id", async () => {
    const refund = await refunds.get("ref_123");
    expect(refund.id).toBe("ref_123");
    expect(refund.paymentId).toBe("pay_123");
  });

  it("list returns refunds", async () => {
    const res = await refunds.list({ paymentId: "pay_123" });
    expect(res.refunds).toHaveLength(1);
    expect(res.total).toBe(1);
  });

  it("list works without arguments", async () => {
    const res = await refunds.list();
    expect(res.refunds).toHaveLength(1);
  });
});
