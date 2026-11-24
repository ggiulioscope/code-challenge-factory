# Introduce a second submission contract and ledger

Legacy intake and its ledger continue to accept USD cents. A distinct submitV2 entry point accepts a nested price with explicit currency and integer minor units. Its independent ledger retains that shape for retrieval. Each submission is routed to exactly one writer. Reporting projects USD records from both stores into the installed report shape.

Intake deploys the second writer and store with traffic off. Reporting deploys the combined feed and verifies old totals. The client team can then route new-format requests to v2. Count calls to each entry point and identify consumers of the legacy feed. Maintain compatibility for 90 days and retire v1 after clients confirm migration and observed legacy traffic reaches zero.

On rollback stop new v2 intake and hold v2 retries for the compatible writer. Preserve both ledgers. The old reader can never interpret a v2 EUR record because it sees only its USD feed. Keep the combined feed running even when rolling back the report executable. A rollback to a v1-only feed after v2 USD writes would undercount, so pause publication if the combined feed cannot be served.

Separate storage isolates old writers and permits independent rollback, but reporting must read across both versions. A shared ledger with optional currency is simpler when every consumer reliably goes through a guarded delivery boundary.

Run `npm test` and `npm run typecheck`. The mixed-ledger test proves EUR retrieval, exclusion from the installed USD total, and inclusion of new-format USD.
