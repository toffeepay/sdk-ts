import { describe, it, expect } from "vitest";
import { accounts } from "./setup.js";

describe("accounts", () => {
  it("get returns an account by id", async () => {
    const account = await accounts.get("acc_123");
    expect(account.id).toBe("acc_123");
    expect(account.currency).toBe("USD");
    expect(account.balance?.real).toBe(500);
    expect(account.balance?.bonus).toBe(100);
  });

  it("list returns accounts", async () => {
    const res = await accounts.list({ gameId: "game_1" });
    expect(res.accounts).toHaveLength(1);
    expect(res.total).toBe(1);
  });
});
