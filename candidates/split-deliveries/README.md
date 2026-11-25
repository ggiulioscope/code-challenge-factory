# Split an order into deliveries

**Take-home · 45–60 minutes · TypeScript and SQLite**

A warehouse orders 10 keyboards. Four arrive on Monday and five more on Tuesday. The receiving clerk needs to know how many are still due. Accounting also needs to see each delivery later, so keeping only a running balance would lose information.

## Your task

Implement `recordDelivery(db, orderId, quantity)` in `delivery.ts`. A successful call records one arrival and returns the number of units **still due after that arrival**. Each call represents a separate physical delivery, even when two quantities are identical.

The starter creates a fresh in-memory database with an `orders` table. Order 17 requests 10 units and order 18 requests 3. Add a `deliveries` table in `database.ts` with an `order_id` referencing the order and a `quantity` for that arrival. You may add columns. Preserve the original ordered quantity and keep the delivery history in SQLite.

## Worked example

Run these calls in order on the same database.

| Order | Arriving units | Result | Delivery history for that order |
|---|---:|---|---|
| 17 | 4 | Return 6 | 4 |
| 17 | 5 | Return 1 | 4, 5 |
| 17 | 2 | Throw an error | 4, 5 |
| 17 | 1 | Return 0 | 4, 5, 1 |
| 18 | 3 | Return 0 | 3 |

On the third call only one keyboard is due. Reject the whole delivery. The clerk can correct the quantity and try again.

## Rules

- Throw an error if the order is missing, the quantity is not a positive safe integer, or the arrival exceeds what is due. Choose your own error messages.
- A rejected call must leave the database unchanged. Once an order is complete, every further positive delivery exceeds its balance.
- Assume one clerk calls the function at a time, using the supplied database connection. There is no server or UI to build.

## Run and submit

Use Node.js 24.x. In this folder run `npm ci`, then `npm test` and `npm run typecheck`. The example tests initially fail at the unfinished function. Implement the schema and function, keep the supplied tests passing, and add a test for an edge case they miss.

**Submit your solution by opening a pull request (PR) against the `master` branch of this repository.**

1. Create a branch from `master`. If you do not have write access, fork the repository and create the branch in your fork.
2. Commit your implementation and tests for `candidates/split-deliveries/` and push your branch.
3. Open a PR with this repository as the base repository, `master` as the base branch, and your solution branch as the source. In the PR description, explain how you calculate the remaining quantity and what your added test protects. Include the results of `npm test` and `npm run typecheck`.
