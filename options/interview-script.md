# Architecture PR follow-up

Allow ten minutes for the exercise the candidate completed. Ask the opening question, use the matching exercise below, then close. Give the candidate time to think before offering a hint. The sample replies are for the interviewer. Credit other designs when the candidate can trace their consequences.

## Open with their change · 2 minutes

“Show me the smallest part of your diff that makes the new behavior safe. Which test would fail if we removed it?”

Listen for a specific code path, an input that reaches it, and an observable failure. If the answer stays abstract, ask them to walk through their own regression test.

## Who can change an order? · 6 minutes

| Ask aloud | Possible short reply |
|---|---|
| “Purchasing cancels order 17 at noon. Finance gets its first invoice at 12:01. What should each team see, and who decides?” | “Finance keeps the invoice. Purchasing still shows canceled because it owns the order lifecycle.” |
| **For a synchronous command:** “The invoice insert succeeds. The order update throws. I restart the process. What’s in the database, and what can I retry?” | “The transaction rolls back both writes. Finance can retry recording the invoice. A canceled order is a valid outcome and should still let the invoice commit.” |
| **For a read-time projection:** “The buyer’s screen says billed, but a nightly export reading the order table says open. Which result would you trust, and how would you fix the discrepancy?” | “The screen uses Purchasing’s status contract. I’d move the export to that contract and check which other consumers read the raw field.” |
| “Purchasing ships your change on Monday. Finance still runs Friday’s code. Can the original bug happen on Tuesday?” | “Yes. The old Finance writer can still overwrite cancellation. We need to drain or disable it at cutover and investigate orders touched during the overlap.” |

Ask only the branch-specific question that fits. For another design, ask the candidate to name the point where the invoice is durable and trace a failure immediately afterward.

## Add euros while older clients keep running · 6 minutes

| Ask aloud | Possible short reply |
|---|---|
| “We have 1,250 USD cents and receive 800 EUR cents. Walk me from submission to the old report. Where can I still find the 800?” | “The ledger retains 800 with EUR attached. The delivery boundary sends only USD to the old reader, so it totals 1,250.” |
| **For optional currency:** “One old intake instance is still live when the first EUR request arrives. What would it save, and how would you prevent that?” | “It could drop the tag and save 800 as dollars. Keep EUR traffic off until every eligible writer preserves the tag and the guarded feed is live.” |
| **For separate ledgers:** “Both USD and EUR have reached v2. Reporting rolls back to reading only v1. Could the dollar total still be wrong?” | “Yes. It would omit v2 dollars. Keep the combined USD feed running or pause publication until totals can be reconciled.” |
| “The old client has been quiet for a week. What evidence would let you retire its contract?” | “Measure use by client and version, cover infrequent jobs, and confirm migration with owners after the promised 90 days.” |

Ask only the branch-specific question that fits. For another design, ask the candidate to trace the first EUR record across a rollback of one component they choose.

## Close on the decision · 2 minutes

“What change in the business would make you switch to the alternative you considered?”

Possible replies include “If Finance must accept invoices during a Purchasing outage, I’d decouple receipt from the order update” or “If old readers can bypass our USD feed, I’d isolate EUR storage before enabling it.”

Record one decision the candidate defended with evidence from the PR and one assumption they identified under questioning. A candidate who spots a gap, predicts its effect, and proposes a focused test has demonstrated architectural reasoning even if their submitted code missed the case.
