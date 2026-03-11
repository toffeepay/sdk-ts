import { createClient, createRouterTransport } from "@connectrpc/connect";
import { create } from "@bufbuild/protobuf";
import {
  PaymentService,
  SessionSchema,
  ListSessionsResponseSchema,
  GetSessionStatusResponseSchema,
  CreateSessionResponseSchema,
  GetSessionResponseSchema,
  GetPaymentResponseSchema,
  PaymentSchema,
  ListPaymentsResponseSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";
import {
  RefundService,
  RefundSchema,
  CreateRefundResponseSchema,
  GetRefundResponseSchema,
  ListRefundsResponseSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/refund_pb.js";
import {
  AccountService,
  AccountSchema,
  GetAccountResponseSchema,
  ListAccountsResponseSchema,
  DepositSchema,
  GetDepositResponseSchema,
  ListDepositsResponseSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/account_pb.js";
import { BalanceSchema } from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/common_pb.js";
import { Sessions } from "../src/resources/sessions.js";
import { Payments } from "../src/resources/payments.js";
import { Refunds } from "../src/resources/refunds.js";
import { Accounts } from "../src/resources/accounts.js";
import { Deposits } from "../src/resources/deposits.js";

const mockSession = create(SessionSchema, {
  id: "sess_123",
  url: "https://pay.toffeepay.com/sess_123",
  status: "pending",
  userId: "user_1",
  gameId: "game_1",
  item: { title: "Gem Pack", price: 100, currency: "USD" },
});

const mockPayment = create(PaymentSchema, {
  id: "pay_123",
  sessionId: "sess_123",
  status: "succeeded",
  amount: 100,
  currency: "USD",
  method: "card",
  details: "visa *4242",
});

const mockRefund = create(RefundSchema, {
  id: "ref_123",
  paymentId: "pay_123",
  status: "succeeded",
});

const mockAccount = create(AccountSchema, {
  id: "acc_123",
  currency: "USD",
  balance: create(BalanceSchema, { real: 500, bonus: 100 }),
});

const mockDeposit = create(DepositSchema, {
  id: "dep_123",
  accountId: "acc_123",
  status: "succeeded",
  amount: 1000,
  currency: "USD",
  method: "card",
  details: "visa *4242",
});

const transport = createRouterTransport((router) => {
  router.service(PaymentService, {
    createSession: () =>
      create(CreateSessionResponseSchema, { session: mockSession }),
    getSession: () =>
      create(GetSessionResponseSchema, { session: mockSession }),
    getSessionStatus: () =>
      create(GetSessionStatusResponseSchema, { status: "pending" }),
    listSessions: () =>
      create(ListSessionsResponseSchema, {
        sessions: [mockSession],
        total: 1,
        hasMore: false,
      }),
    cancelSession: () => ({}),
    getPayment: () =>
      create(GetPaymentResponseSchema, { payment: mockPayment }),
    listPayments: () =>
      create(ListPaymentsResponseSchema, {
        payments: [mockPayment],
        total: 1,
        hasMore: false,
      }),
    completePayment: () => ({}),
    cancelPayment: () => ({}),
  });

  router.service(RefundService, {
    createRefund: () =>
      create(CreateRefundResponseSchema, { id: "ref_123", refund: mockRefund }),
    getRefund: () =>
      create(GetRefundResponseSchema, { refund: mockRefund }),
    listRefunds: () =>
      create(ListRefundsResponseSchema, {
        refunds: [mockRefund],
        total: 1,
        hasMore: false,
      }),
  });

  router.service(AccountService, {
    getAccount: () =>
      create(GetAccountResponseSchema, { account: mockAccount }),
    listAccounts: () =>
      create(ListAccountsResponseSchema, {
        accounts: [mockAccount],
        total: 1,
        hasMore: false,
      }),
    getDeposit: () =>
      create(GetDepositResponseSchema, { deposit: mockDeposit }),
    listDeposits: () =>
      create(ListDepositsResponseSchema, {
        deposits: [mockDeposit],
        total: 1,
        hasMore: false,
      }),
  });
});

const paymentClient = createClient(PaymentService, transport);
const refundClient = createClient(RefundService, transport);
const accountClient = createClient(AccountService, transport);

export const sessions = new Sessions(paymentClient);
export const payments = new Payments(paymentClient);
export const refunds = new Refunds(refundClient);
export const accounts = new Accounts(accountClient);
export const deposits = new Deposits(accountClient);
