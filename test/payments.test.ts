import { describe, it, expect } from "vitest";
import { payments } from "./setup.js";

describe("payments", () => {
  it("get returns a payment response", async () => {
    const res = await payments.get({ id: "pay_123" });
    expect(res.payment?.id).toBe("pay_123");
    expect(res.payment?.status).toBe("succeeded");
    expect(res.payment?.method).toBe("card");
  });

  it("list returns payments", async () => {
    const res = await payments.list({ gameId: "game_1" });
    expect(res.payments).toHaveLength(1);
    expect(res.total).toBe(1);
  });

  it("complete returns a response", async () => {
    const res = await payments.complete({ id: "pay_123" });
    expect(res).toBeDefined();
  });

  it("cancel returns a response", async () => {
    const res = await payments.cancel({ id: "pay_123" });
    expect(res).toBeDefined();
  });
});
