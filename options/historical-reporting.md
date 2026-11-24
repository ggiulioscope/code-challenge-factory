# Reproduce the spend report Finance actually signed

## Candidate brief

Finance closes a month and signs the supplier spend report. Purchasing can later correct invoices dated in that month. Finance needs both the originally signed total and a corrected total. Teams currently query the same mutable invoice rows.

### Starter supplied by the interviewer

A tiny local reporting function and fixtures containing an invoice for 100, a month close, and a subsequent correction to 80. All code and data are fictional and run locally.

### What to submit in 60 minutes

Decide what close freezes and who can publish a correction. Change one reporting path so a reviewer can obtain both 100 as signed and 80 as corrected. Add a test using the fixture. Describe how you would introduce the design for months that closed before historical data was retained. Open a PR with the small working change and a short design note covering your decision, a credible alternative, and the condition that would make you reconsider. Budget roughly 10 minutes to read, 25 to design, 20 to demonstrate the decision, and 5 to finish the PR.

### Out of scope

Skip accounting integrations, a general event platform, tax rules, and a reporting UI. The example has one supplier and currency.

## Interviewer only

### Plausible designs and tradeoffs

A frozen report snapshot is straightforward to retrieve and captures exactly what was shown, but may omit detail needed for later analysis. Immutable invoice revisions with a close cutoff support richer reconstruction, but replay must also account for changes to reporting logic.

### What to look for

Ask whether rerunning last year's report after a rounding-rule change still reproduces the signed number. Look for clarity on stored evidence and on historical periods whose original totals cannot be reconstructed.
