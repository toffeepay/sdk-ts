import type { Client, CallOptions } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  PaymentService,
  CreateSessionResponse,
  GetSessionResponse,
  GetSessionStatusResponse,
  CancelSessionResponse,
  ListSessionsResponse,
  CreateSessionRequestSchema,
  GetSessionRequestSchema,
  GetSessionStatusRequestSchema,
  CancelSessionRequestSchema,
  ListSessionsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";
import type { RequestOptions } from "../types.js";

export class Sessions {
  constructor(private client: Client<typeof PaymentService>) {}

  async create(req: MessageInitShape<typeof CreateSessionRequestSchema>, options?: RequestOptions): Promise<CreateSessionResponse> {
    const callOptions: CallOptions = {};
    if (options?.idempotencyKey) {
      callOptions.headers = { "Idempotency-Key": options.idempotencyKey };
    }
    return this.client.createSession(req, callOptions);
  }

  async get(req: MessageInitShape<typeof GetSessionRequestSchema>): Promise<GetSessionResponse> {
    return this.client.getSession(req);
  }

  async status(req: MessageInitShape<typeof GetSessionStatusRequestSchema>): Promise<GetSessionStatusResponse> {
    return this.client.getSessionStatus(req);
  }

  async list(req: MessageInitShape<typeof ListSessionsRequestSchema>): Promise<ListSessionsResponse> {
    return this.client.listSessions(req);
  }

  async cancel(req: MessageInitShape<typeof CancelSessionRequestSchema>): Promise<CancelSessionResponse> {
    return this.client.cancelSession(req);
  }
}
