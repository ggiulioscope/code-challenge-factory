# Change a shared contract while clients upgrade at different times

## Candidate brief

A purchase request currently carries an integer amount in USD cents. A new client must submit euros. Three teams release independently, and the oldest client will stay in service for 90 days. Interpreting euros as dollars would corrupt financial reports.

### Starter supplied by the interviewer

A local parser, a legacy USD request fixture, and a legacy report reader that assumes USD. Currency conversion is unnecessary. All code and data are fictional and run locally.

### What to submit in 60 minutes

Design the compatibility contract for submission and reporting. Implement one compatibility boundary and a test showing legacy USD still works and a euro record cannot silently enter the USD total. Outline rollout order, how to detect remaining old clients, and what happens to euro records during rollback. Open a PR with the small working change and a short design note covering your decision, a credible alternative, and the condition that would make you reconsider. Budget roughly 10 minutes to read, 25 to design, 20 to demonstrate the decision, and 5 to finish the PR.

### Out of scope

Skip currency conversion, deploying clients, building an API server, and implementing the entire migration. Use integer minor units for both currencies.

## Interviewer only

### Plausible designs and tradeoffs

Adding an optional currency keeps old writers working but old readers may ignore the field, so exposure needs gating. A versioned contract with an explicit legacy USD view isolates old readers but introduces parallel formats and a retirement plan.

### What to look for

Ask what happens if the first euro record is written today and tomorrow the report release rolls back. Strong answers distinguish rolling back code from making existing data safe.
