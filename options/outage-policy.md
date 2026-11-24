# Keep purchasing during a budget outage

## Candidate brief

A central budget team enforces a hard departmental spending cap. Two branches share that cap. During an outage lasting up to two hours, operations wants each branch to keep approving some purchases. Finance requires that total approved spend always stay within the cap.

### Starter supplied by the interviewer

A local simulation with two branches, a fixed budget of 100 units, and a switch that disconnects them from the central ledger. The cap and branch membership stay fixed during the exercise. All code and data are fictional and run locally.

### What to submit in 60 minutes

Define what approved means during disconnection. Decide how much each branch can promise, who sets that limit, and what happens when one branch exhausts it. Demonstrate one failure scenario in a test or executable model. Explain how Finance reconciles after reconnection. Open a PR with the small working change and a short design note covering your decision, a credible alternative, and the condition that would make you reconsider. Budget roughly 10 minutes to read, 25 to design, 20 to demonstrate the decision, and 5 to finish the PR.

### Out of scope

Skip network simulation beyond the supplied switch, distributed consensus, production storage, and dashboards. A pending request counts as pending until funds are committed.

## Interviewer only

### Plausible designs and tradeoffs

Preallocating spending rights allows final offline approvals but can strand funds at a quiet branch. Centrally authorizing specific planned purchases before disconnection uses capacity more selectively but leaves unplanned purchases waiting. Simply queueing every request protects the cap but requires explicitly renegotiating the offline approval objective.

### What to look for

Give both branches a request for 60 against the same 100. Ask which promise each branch can make without contacting the other. Reward a defensible guarantee and an honest account of the business cost.
