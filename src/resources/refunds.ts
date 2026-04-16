import type { Client, CallOptions } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  RefundService,
  CreateRefundResponse,
  GetRefundResponse,
  ListRefundsResponse,
  CreateRefundRequestSchema,
  GetRefundRequestSchema,
  ListRefundsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/refund_pb.js";
import type { RequestOptions } from "../types.js";

export class Refunds {
  constructor(private client: Client<typeof RefundService>) {}

  async create(req: MessageInitShape<typeof CreateRefundRequestSchema>, options?: RequestOptions): Promise<CreateRefundResponse> {
    const callOptions: CallOptions = {};
    if (options?.idempotencyKey) {
      callOptions.headers = { "Idempotency-Key": options.idempotencyKey };
    }
    return this.client.createRefund(req, callOptions);
  }

  async get(req: MessageInitShape<typeof GetRefundRequestSchema>): Promise<GetRefundResponse> {
    return this.client.getRefund(req);
  }

  async list(req?: MessageInitShape<typeof ListRefundsRequestSchema>): Promise<ListRefundsResponse> {
    return this.client.listRefunds(req ?? {});
  }
}
