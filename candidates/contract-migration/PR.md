# Extend intake with an optional currency

The old writer can omit currency, meaning USD. New writers send USD or EUR explicitly and amounts remain integer minor units. Intake saves the currency on every new row. Historical rows without it mean USD. Reporting owns the delivery boundary and exposes only USD entries in the installed two-field shape. Tagged EUR entries remain available in the ledger.

Release the guarded report feed first and ensure every installed reader uses it. Intake then rolls out validation and tagged writes to every instance. Enable the client team's EUR submissions only after both gates pass. Count untagged submissions and old report consumers by client identity. Retire support after the 90-day window and confirmed migration of dormant clients.

After the first EUR submission, disable new EUR traffic before any intake downgrade. Drain in-flight submissions and preserve tagged records. Keep serving the guarded feed even if the reporting program rolls back. If the feed itself must revert, suspend reporting until an isolated USD snapshot is available. The old writer would silently strip the currency on a replay, so route tagged retries only to upgraded intake.

One ledger avoids managing two feeds for writers. A dedicated versioned intake and separate ledger would reduce rollback coupling at the cost of parallel contracts. Prefer that if old report infrastructure can bypass the delivery boundary.

Run `npm test` and `npm run typecheck`. Tests include historical rows, unchanged submissions, mixed currencies, and rejection of unknown currency.
