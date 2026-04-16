import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  AccountService,
  GetAccountResponse,
  ListAccountsResponse,
  GetAccountRequestSchema,
  ListAccountsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/account_pb.js";

export class Accounts {
  constructor(private client: Client<typeof AccountService>) {}

  async get(req: MessageInitShape<typeof GetAccountRequestSchema>): Promise<GetAccountResponse> {
    return this.client.getAccount(req);
  }

  async list(req: MessageInitShape<typeof ListAccountsRequestSchema>): Promise<ListAccountsResponse> {
    return this.client.listAccounts(req);
  }
}
