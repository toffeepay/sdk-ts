import { describe, it, expect } from "vitest";
import { deposits } from "./setup.js";

describe("deposits", () => {
  it("get returns a deposit by id", async () => {
    const deposit = await deposits.get("dep_123");
    expect(deposit.id).toBe("dep_123");
    expect(deposit.amount).toBe(1000);
    expect(deposit.method).toBe("card");
  });

  it("list returns deposits", async () => {
    const res = await deposits.list({ gameId: "game_1" });
    expect(res.deposits).toHaveLength(1);
    expect(res.total).toBe(1);
  });
});
