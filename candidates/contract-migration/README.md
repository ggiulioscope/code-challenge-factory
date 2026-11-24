# Add euros while older clients keep running

The intake team accepts purchase requests. The reporting team totals them in USD. A third team wants to submit EUR tomorrow. The existing USD client and the installed reporting program must keep working for 90 days. Today, the intake path discards extra fields and the reporting program sums every row it receives.

## Your assignment

In 60 minutes, design a safe contract and implement one working path across the compatibility boundary. Accept an unchanged legacy USD request and a new EUR request, retain both amounts with unambiguous meaning, and feed the installed report a correct USD total. For example, 1250 USD cents plus 800 EUR cents should yield a USD report of 1250 cents. The EUR request must still be retrievable as EUR. Choose the new input shape yourself.

Open a PR against `main` with the change, a mixed-currency regression test, and a short design note in the PR description. Specify the writer, storage, and reader contracts. Give the release order for the three teams, a signal for retiring legacy support, and a rollback plan for the day after the first EUR submission. Explain one alternative and when you would favor it.

## Getting started

Use Node.js 24 and run `node --test` from the repository root. Run `npm ci` once and `npm run typecheck` for strict TypeScript checks. Use type narrowing for external input and database results. Avoid explicit `any`, type assertions, and non-null assertions. Start with `contract.test.ts`. The ledger fixture represents records saved before the upgrade. `readLegacyFeed` is the delivery boundary you control. `legacy-report.ts` represents an already-installed client and must keep its existing behavior and input shape. Keep the existing USD submission usable. Currency conversion, HTTP services, production migrations, and deployment are outside scope.
