# Record each physical delivery

Each accepted arrival gets its own row, even if the previous arrival had the same quantity. The balance is the original order quantity minus the sum of that order’s deliveries. An empty history contributes zero. The order index lets SQLite look up just that history.

The exercise assumes a single clerk. All checks happen before the only write, so an invalid quantity, missing order, or oversized delivery leaves the history intact. The added test records two equal arrivals with invalid attempts between them and checks the resulting rows.

Run `npm test` and `npm run typecheck` in this folder.
