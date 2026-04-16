import { describe, it, expect } from "vitest";
import { accounts } from "./setup.js";

describe("accounts", () => {
  it("get returns an account response", async () => {
    const res = await accounts.get({ id: "acc_123" });
    expect(res.account?.id).toBe("acc_123");
    expect(res.account?.currency).toBe("USD");
    expect(res.account?.balance?.real).toBe(500);
    expect(res.account?.balance?.bonus).toBe(100);
  });

  it("list returns accounts", async () => {
    const res = await accounts.list({ gameId: "game_1" });
    expect(res.accounts).toHaveLength(1);
    expect(res.total).toBe(1);
  });
});
