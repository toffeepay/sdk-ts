import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  PaymentService,
  Payment,
  ListPaymentsResponse,
  ListPaymentsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";

export class Payments {
  constructor(private client: Client<typeof PaymentService>) {}

  async get(id: string, opts?: { withExtraData?: boolean }): Promise<Payment> {
    const res = await this.client.getPayment({ id, ...opts });
    return res.payment!;
  }

  async list(input: MessageInitShape<typeof ListPaymentsRequestSchema>): Promise<ListPaymentsResponse> {
    return this.client.listPayments(input);
  }

  async complete(id: string): Promise<void> {
    await this.client.completePayment({ id });
  }

  async cancel(id: string): Promise<void> {
    await this.client.cancelPayment({ id });
  }
}
