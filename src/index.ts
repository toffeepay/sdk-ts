export { Toffee } from "./client.js";
export type { ToffeeOptions, Environment } from "./client.js";
export type { RequestOptions } from "./types.js";

export { Sessions } from "./resources/sessions.js";
export { Payments } from "./resources/payments.js";
export { Refunds } from "./resources/refunds.js";
export { Accounts } from "./resources/accounts.js";
export { Deposits } from "./resources/deposits.js";

export type {
  Session,
  Payment,
  Item,
  Tax,
  SessionMetadata,
  PaymentExtraData,
  CreateSessionRequest,
  ListSessionsRequest,
  ListSessionsResponse,
  GetSessionStatusResponse,
  ListPaymentsRequest,
  ListPaymentsResponse,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/payment_pb.js";

export type {
  Refund,
  CreateRefundRequest,
  ListRefundsRequest,
  ListRefundsResponse,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/refund_pb.js";

export type {
  Account,
  Deposit,
  ListAccountsRequest,
  ListAccountsResponse,
  ListDepositsRequest,
  ListDepositsResponse,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/account_pb.js";

export type {
  Balance,
  GameUser,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/common_pb.js";

export type {
  Error as ToffeeError,
} from "@buf/toffeepay_toffee.bufbuild_es/pay/v1/common_pb.js";
