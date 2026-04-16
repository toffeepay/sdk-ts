import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import type { Interceptor } from "@connectrpc/connect";
import {
  PaymentService,
  type Session,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";
import {
  RefundService,
  type Refund,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/refund_pb.js";
import {
  AccountService,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/account_pb.js";
import { Sessions } from "./resources/sessions.js";
import { Payments } from "./resources/payments.js";
import { Refunds } from "./resources/refunds.js";
import { Accounts } from "./resources/accounts.js";
import { Deposits } from "./resources/deposits.js";

const BASE_URLS = {
  production: "https://api.toffeepay.com",
  sandbox: "https://api.sandbox.toffeepay.com",
} as const;

export type Environment = keyof typeof BASE_URLS;

export interface ToffeeOptions {
  accessToken: string;
  environment?: Environment;
}

export class Toffee {
  readonly sessions: Sessions;
  readonly payments: Payments;
  readonly refunds: Refunds;
  readonly accounts: Accounts;
  readonly deposits: Deposits;

  constructor(opts: ToffeeOptions) {
    const authInterceptor: Interceptor = (next) => (req) => {
      req.header.set("Authorization", `Bearer ${opts.accessToken}`);
      return next(req);
    };

    const transport = createConnectTransport({
      baseUrl: BASE_URLS[opts.environment ?? "production"],
      httpVersion: "1.1",
      interceptors: [authInterceptor],
    });

    const paymentClient = createClient(PaymentService, transport);
    const refundClient = createClient(RefundService, transport);
    const accountClient = createClient(AccountService, transport);

    this.sessions = new Sessions(paymentClient);
    this.payments = new Payments(paymentClient);
    this.refunds = new Refunds(refundClient);
    this.accounts = new Accounts(accountClient);
    this.deposits = new Deposits(accountClient);
  }

  async checkout(...args: Parameters<Sessions["create"]>): Promise<Session> {
    const res = await this.sessions.create(...args);
    return res.session!;
  }

  async refund(...args: Parameters<Refunds["create"]>): Promise<Refund> {
    const res = await this.refunds.create(...args);
    return res.refund!;
  }
}
