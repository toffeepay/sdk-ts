import type { Client, CallOptions } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  RefundService,
  Refund,
  ListRefundsResponse,
  CreateRefundRequestSchema,
  ListRefundsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/refund_pb.js";
import type { RequestOptions } from "../types.js";

export class Refunds {
  constructor(private client: Client<typeof RefundService>) {}

  async create(input: MessageInitShape<typeof CreateRefundRequestSchema>, options?: RequestOptions): Promise<Refund> {
    const callOptions: CallOptions = {};
    if (options?.idempotencyKey) {
      callOptions.headers = { "Idempotency-Key": options.idempotencyKey };
    }
    const res = await this.client.createRefund(input, callOptions);
    return res.refund!;
  }

  async get(id: string): Promise<Refund> {
    const res = await this.client.getRefund({ id });
    return res.refund!;
  }

  async list(input?: MessageInitShape<typeof ListRefundsRequestSchema>): Promise<ListRefundsResponse> {
    return this.client.listRefunds(input ?? {});
  }
}
