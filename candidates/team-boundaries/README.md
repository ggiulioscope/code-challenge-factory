# Who can change an order?

Purchasing owns orders. Finance owns invoices. Last week Purchasing canceled an order, then Finance received its first invoice. The invoice was genuine and needed recording. Recording it also changed the canceled order to billed. Both teams had shipped code that passed their own tests.

## Your assignment

You have 60 minutes and the teams have capacity to migrate one workflow. Change how recording the first invoice affects an order. A canceled order must stay canceled and Finance must retain the invoice. For an open order, billing must still be reflected in Purchasing. You may choose when that reflection happens. Keep the public workflow usable and demonstrate the late-invoice case through the same entry points callers use.

Open a PR against `main` with the change, its regression test, and a short design note in the PR description. Show the dependencies before and after with arrows. Explain who owns each fact, what happens if the workflow stops halfway, who resolves disagreement, and how the teams adopt the change. Name one alternative and a condition that would make it preferable.

## Getting started

Use Node.js 24 and run `node --test` from the repository root. Run `npm ci` once and `npm run typecheck` for strict TypeScript checks. Use type narrowing for external input and database results. Avoid explicit `any`, type assertions, and non-null assertions. The fixture creates a fresh in-memory SQLite database for each test. Start in `workflow.test.ts`, then read the two team modules. The passing tests cover the existing happy paths. Scope the exercise to one invoice per order, one process, and the existing local database. Deployment, network transports, and other order workflows are outside scope.
