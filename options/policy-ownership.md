# Give divisions autonomy over purchasing rules

## Candidate brief

Three divisions share one approval engine. Each division chooses its own review threshold, while company policy requires central review for every restricted item regardless of price. Today each division copies the whole approval function. One copy has drifted.

### Starter supplied by the interviewer

Three small policy functions, sample requests, and an existing command that prints the required reviewers. The fixture includes a cheap restricted item. All code and data are fictional and run locally.

### What to submit in 60 minutes

Design who controls the mandatory rule and how division owners express permitted differences. Migrate one division through the new design. Test a request that triggers both central and local review. Describe how the remaining divisions would migrate and how a bad division change would be rolled back. Open a PR with the small working change and a short design note covering your decision, a credible alternative, and the condition that would make you reconsider. Budget roughly 10 minutes to read, 25 to design, 20 to demonstrate the decision, and 5 to finish the PR.

### Out of scope

Skip a policy language, administration UI, access-control implementation, and migrating every division. A local configuration file or ordinary functions are sufficient.

## Interviewer only

### Plausible designs and tradeoffs

A shared evaluator with per-division configuration is easy to audit and limits accidental overrides, but new kinds of exceptions require central changes. Division-owned policy functions composed with a mandatory central check allow richer variation, but need a stable interface and tests for composition.

### What to look for

Ask who can add a new local rule without coordinating a release and whether that change could suppress central review. Reward a concrete ownership model tied to the behavior of the sample.
