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
const res    = await toffee.sessions.create({ gameId: "game_1", userId: "user_1", item: { ... }, returnUrl: "https://example.com/return" });
const res    = await toffee.sessions.get({ id: "sess_123" });
const res    = await toffee.sessions.status({ id: "sess_123" });
const res    = await toffee.sessions.list({ gameId: "game_1" });
const res    = await toffee.sessions.cancel({ id: "sess_123" });
```

### Payments

```ts
const res = await toffee.payments.get({ id: "pay_123" });
const res = await toffee.payments.list({ gameId: "game_1" });
const res = await toffee.payments.complete({ id: "pay_123" });
const res = await toffee.payments.cancel({ id: "pay_123" });
```

### Refunds

```ts
const res = await toffee.refunds.create({ paymentId: "pay_123" });
const res = await toffee.refunds.get({ id: "ref_123" });
const res = await toffee.refunds.list({ paymentId: "pay_123" });
```

### Accounts

```ts
const res = await toffee.accounts.get({ id: "acc_123" });
const res = await toffee.accounts.list({ gameId: "game_1" });
```

### Deposits

```ts
const res = await toffee.deposits.get({ id: "dep_123" });
const res = await toffee.deposits.list({ gameId: "game_1" });
```

## License

[MIT](LICENSE)
