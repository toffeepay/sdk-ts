import { describe, it, expect } from "vitest";
import { sessions } from "./setup.js";

describe("sessions", () => {
  it("create returns a session response", async () => {
    const res = await sessions.create({
      gameId: "game_1",
      userId: "user_1",
      item: { title: "Gem Pack", price: 100, currency: "USD" },
      returnUrl: "https://example.com/return",
    });
    expect(res.session?.id).toBe("sess_123");
    expect(res.session?.url).toBe("https://pay.toffeepay.com/sess_123");
    expect(res.session?.status).toBe("pending");
  });

  it("get returns a session response", async () => {
    const res = await sessions.get({ id: "sess_123" });
    expect(res.session?.id).toBe("sess_123");
    expect(res.session?.gameId).toBe("game_1");
  });

  it("status returns session status", async () => {
    const res = await sessions.status({ id: "sess_123" });
    expect(res.status).toBe("pending");
  });

  it("list returns sessions", async () => {
    const res = await sessions.list({ gameId: "game_1" });
    expect(res.sessions).toHaveLength(1);
    expect(res.total).toBe(1);
    expect(res.hasMore).toBe(false);
  });

  it("cancel returns a response", async () => {
    const res = await sessions.cancel({ id: "sess_123" });
    expect(res).toBeDefined();
  });
});
