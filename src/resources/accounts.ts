import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  AccountService,
  Account,
  ListAccountsResponse,
  ListAccountsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/account_pb.js";

export class Accounts {
  constructor(private client: Client<typeof AccountService>) {}

  async get(id: string): Promise<Account> {
    const res = await this.client.getAccount({ id });
    return res.account!;
  }

  async list(input: MessageInitShape<typeof ListAccountsRequestSchema>): Promise<ListAccountsResponse> {
    return this.client.listAccounts(input);
  }
}
