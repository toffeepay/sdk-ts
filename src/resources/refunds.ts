import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  RefundService,
  Refund,
  ListRefundsResponse,
  CreateRefundRequestSchema,
  ListRefundsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/refund_pb.js";

export class Refunds {
  constructor(private client: Client<typeof RefundService>) {}

  async create(input: MessageInitShape<typeof CreateRefundRequestSchema>): Promise<Refund> {
    const res = await this.client.createRefund(input);
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
