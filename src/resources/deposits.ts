import type { Client } from "@connectrpc/connect";
import type { MessageInitShape } from "@bufbuild/protobuf";
import type {
  AccountService,
  Deposit,
  ListDepositsResponse,
  ListDepositsRequestSchema,
} from "@buf/toffeepay_toffee.bufbuild_es/wallet/v1/account_pb.js";

export class Deposits {
  constructor(private client: Client<typeof AccountService>) {}

  async get(id: string): Promise<Deposit> {
    const res = await this.client.getDeposit({ id });
    return res.deposit!;
  }

  async list(input: MessageInitShape<typeof ListDepositsRequestSchema>): Promise<ListDepositsResponse> {
    return this.client.listDeposits(input);
  }
}
