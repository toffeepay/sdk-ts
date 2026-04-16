import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  AccountService,
  GetDepositResponse,
  ListDepositsResponse,
  GetDepositRequestSchema,
  ListDepositsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/account_pb.js";

export class Deposits {
  constructor(private client: Client<typeof AccountService>) {}

  async get(req: MessageInitShape<typeof GetDepositRequestSchema>): Promise<GetDepositResponse> {
    return this.client.getDeposit(req);
  }

  async list(req: MessageInitShape<typeof ListDepositsRequestSchema>): Promise<ListDepositsResponse> {
    return this.client.listDeposits(req);
  }
}
