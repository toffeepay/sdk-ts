import { describe, it, expect } from "vitest";
import { payments } from "./setup.js";

describe("payments", () => {
  it("get returns a payment by id", async () => {
    const payment = await payments.get("pay_123");
    expect(payment.id).toBe("pay_123");
    expect(payment.status).toBe("succeeded");
    expect(payment.method).toBe("card");
  });

  it("list returns payments", async () => {
    const res = await payments.list({ gameId: "game_1" });
    expect(res.payments).toHaveLength(1);
    expect(res.total).toBe(1);
  });

  it("complete resolves without error", async () => {
    await expect(payments.complete("pay_123")).resolves.toBeUndefined();
  });

  it("cancel resolves without error", async () => {
    await expect(payments.cancel("pay_123")).resolves.toBeUndefined();
  });
});
