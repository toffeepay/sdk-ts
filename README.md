# @toffeepay/sdk

ToffeePay TypeScript SDK.

## Install

```bash
npm install @toffeepay/sdk
```

## Usage

```ts
import { Toffee } from "@toffeepay/sdk";

const toffee = new Toffee({
  accessToken: "your-access-token",
});

// Checkout
const session = await toffee.checkout({
  item: { title: "Gem Pack 50", price: 100, currency: "USD" },
  gameId: "your-game-id",
  userId: "user-id",
  returnUrl: "https://example.com/return",
});

console.log(session.url); // redirect the user here

// Refund
const refund = await toffee.refund({ paymentId: "pay_123" });
```

### Idempotency

Pass an idempotency key to protect against duplicate operations:

```ts
const session = await toffee.checkout(
  { item: { title: "Gem Pack 50", price: 100, currency: "USD" }, gameId: "game_1", userId: "user_1", returnUrl: "https://example.com/return" },
  { idempotencyKey: "unique-key-123" },
);

const refund = await toffee.refund(
  { paymentId: "pay_123" },
  { idempotencyKey: "refund-key-456" },
);
```

### Sandbox

```ts
const toffee = new Toffee({
  accessToken: "your-sandbox-token",
  environment: "sandbox",
});
```

## Resources

### Sessions

```ts
const session = await toffee.sessions.create({ ... });
const session = await toffee.sessions.get("sess_123");
const status  = await toffee.sessions.status("sess_123");
const list    = await toffee.sessions.list({ gameId: "game_1" });
await toffee.sessions.cancel("sess_123");
```

### Payments

```ts
const payment = await toffee.payments.get("pay_123");
const list    = await toffee.payments.list({ gameId: "game_1" });
await toffee.payments.complete("pay_123");
await toffee.payments.cancel("pay_123");
```

### Refunds

```ts
const refund = await toffee.refunds.create({ paymentId: "pay_123" });
const refund = await toffee.refunds.get("ref_123");
const list   = await toffee.refunds.list({ paymentId: "pay_123" });
```

### Accounts

```ts
const account = await toffee.accounts.get("acc_123");
const list    = await toffee.accounts.list({ gameId: "game_1" });
```

### Deposits

```ts
const deposit = await toffee.deposits.get("dep_123");
const list    = await toffee.deposits.list({ gameId: "game_1" });
```

## License

[MIT](LICENSE)
