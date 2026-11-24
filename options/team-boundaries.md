# Let two teams release independently

## Candidate brief

Purchasing owns orders and Finance owns invoices. Both teams write the order table. A Finance release recently reopened a canceled order. Leadership wants clear ownership, and the teams can migrate only one workflow this quarter.

### Starter supplied by the interviewer

A local SQLite fixture and two short modules. The sample workflow records the first invoice for an order. Purchasing already exposes a cancel operation. Finance currently changes order status directly. All code and data are fictional and run locally.

### What to submit in 60 minutes

Choose who owns each fact and what Finance can ask Purchasing to do. Draw the before-and-after dependency arrows. Change the invoice workflow at one boundary and test what happens when the invoice arrives after cancellation. State which team owns reconciliation if the two sides disagree. Open a PR with the small working change and a short design note covering your decision, a credible alternative, and the condition that would make you reconsider. Budget roughly 10 minutes to read, 25 to design, 20 to demonstrate the decision, and 5 to finish the PR.

### Out of scope

Keep the modules in one process for the exercise. Leave other workflows alone. Service deployment, network calls, and a full domain model are outside scope.

## Interviewer only

### Plausible designs and tradeoffs

A synchronous Purchasing operation gives Finance an immediate decision and can share a transaction, but Finance depends on Purchasing being available. Recording the invoice independently and projecting its effect onto the order lets Finance progress during a Purchasing outage, but creates a period of disagreement and needs reconciliation.

### What to look for

Ask whether Finance can still record that an invoice exists even when Purchasing refuses to reopen the order. Look for an explicit distinction between those business facts, and a migration step that actually removes the direct write.
