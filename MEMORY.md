# Architecture interview planning

## Exercise constraints

- Write all candidate starter code and tests in strict TypeScript. Accept untrusted input as `unknown` and narrow it at the boundary. Prefer inference and validated types over explicit `any`, casts, non-null assertions, or compiler-error suppressions. Run the tests and type checker before sharing an exercise.

- Create an independent, generic procurement exercise. Write all starter code, schema, fixtures, and tests from scratch. Keep company source, data, and internal documentation private.
- Start with an empty candidate repository. Before the exercise, give it one small, original baseline commit so the candidate has an existing architectural decision to revisit in a PR.
- Plan for 60 minutes, including reading the baseline, implementing a change, testing one revealing edge case, and writing a short PR description explaining the chosen design and one alternative.
- Use a local runtime and its standard library. SQLite is sufficient for persistence. Provide a working setup and test command. No external services, credentials, or infrastructure setup.
- Keep this planning file and the resolution notes interviewer-only. Choose one option before writing the candidate brief.

## Senior architecture interview options

Evaluate architecture judgment for a leader of multiple teams. The PR should demonstrate one design decision and explain its organizational or operational consequences. Share only the candidate brief and the original starter fixture for the selected option.

- [Let two teams release independently](options/team-boundaries.md)
- [Change a shared contract while clients upgrade at different times](options/contract-migration.md)
- [Keep purchasing during a budget outage](options/outage-policy.md)
- [Reproduce the spend report Finance actually signed](options/historical-reporting.md)
- [Give divisions autonomy over purchasing rules](options/policy-ownership.md)

## Implemented exercises

- [Team boundaries](candidates/team-boundaries/README.md) uses Node.js 24 and built-in SQLite.
- [Contract migration](candidates/contract-migration/README.md) uses Node.js 24 and local JSON fixtures.

Keep one Git repository at the interview workspace root. Each candidate directory holds an exportable starter on the root `master` branch. Run `node --test` from the exercise directory. For a candidate handoff, export just that directory to the candidate repository's `main` branch. The files in `options/` contain the interviewer discussion notes.

## Interviewer solution branches

All four solution branches live at the root. For team-boundaries use `solution/purchasing-command` or `solution/invoice-projection`. For contract-migration use `solution/optional-currency` or `solution/versioned-ledger`. Each branch contains the implementation, tests, and `PR.md` in the corresponding exercise directory.
