import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  PaymentService,
  Session,
  ListSessionsResponse,
  GetSessionStatusResponse,
  CreateSessionRequestSchema,
  ListSessionsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";

export class Sessions {
  constructor(private client: Client<typeof PaymentService>) {}

  async create(input: MessageInitShape<typeof CreateSessionRequestSchema>): Promise<Session> {
    const res = await this.client.createSession(input);
    return res.session!;
  }

  async get(id: string): Promise<Session> {
    const res = await this.client.getSession({ id });
    return res.session!;
  }

  async status(id: string): Promise<GetSessionStatusResponse> {
    return this.client.getSessionStatus({ id });
  }

  async list(input: MessageInitShape<typeof ListSessionsRequestSchema>): Promise<ListSessionsResponse> {
    return this.client.listSessions(input);
  }

  async cancel(id: string): Promise<void> {
    await this.client.cancelSession({ id });
  }
}
