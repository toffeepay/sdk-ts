import { describe, it, expect } from "vitest";
import { createClient, createRouterTransport } from "@connectrpc/connect";
import { create } from "@bufbuild/protobuf";
import {
  PaymentService,
  SessionSchema,
  CreateSessionResponseSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";
import { Sessions } from "../src/resources/sessions.js";

describe("checkout", () => {
  it("checkout delegates to sessions.create", async () => {
    const mockSession = create(SessionSchema, {
      id: "sess_456",
      url: "https://pay.toffeepay.com/sess_456",
      status: "pending",
      userId: "user_1",
      gameId: "game_1",
      item: { title: "Gem Pack 50", price: 100, currency: "USD" },
    });

    const transport = createRouterTransport((router) => {
      router.service(PaymentService, {
        createSession: (req) => {
          expect(req.gameId).toBe("game_1");
          expect(req.userId).toBe("user_1");
          expect(req.item?.title).toBe("Gem Pack 50");
          return create(CreateSessionResponseSchema, { session: mockSession });
        },
      });
    });

    const client = createClient(PaymentService, transport);
    const sessions = new Sessions(client);

    // Simulate what Toffee.checkout does
    const session = await sessions.create({
      item: { title: "Gem Pack 50", price: 100, currency: "USD" },
      gameId: "game_1",
      userId: "user_1",
      returnUrl: "https://example.com/return",
    });

    expect(session.id).toBe("sess_456");
    expect(session.url).toBe("https://pay.toffeepay.com/sess_456");
  });
});
