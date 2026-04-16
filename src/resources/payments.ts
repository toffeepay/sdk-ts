import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  PaymentService,
  GetPaymentResponse,
  CompletePaymentResponse,
  CancelPaymentResponse,
  ListPaymentsResponse,
  GetPaymentRequestSchema,
  CompletePaymentRequestSchema,
  CancelPaymentRequestSchema,
  ListPaymentsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";

export class Payments {
  constructor(private client: Client<typeof PaymentService>) {}

  async get(req: MessageInitShape<typeof GetPaymentRequestSchema>): Promise<GetPaymentResponse> {
    return this.client.getPayment(req);
  }

  async list(req: MessageInitShape<typeof ListPaymentsRequestSchema>): Promise<ListPaymentsResponse> {
    return this.client.listPayments(req);
  }

  async complete(req: MessageInitShape<typeof CompletePaymentRequestSchema>): Promise<CompletePaymentResponse> {
    return this.client.completePayment(req);
  }

  async cancel(req: MessageInitShape<typeof CancelPaymentRequestSchema>): Promise<CancelPaymentResponse> {
    return this.client.cancelPayment(req);
  }
}
