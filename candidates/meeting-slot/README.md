# Find the next available meeting slot

**Take-home · 45–60 minutes · TypeScript and SQLite**

A coordinator needs one room for a meeting. They know the group size, how long the meeting will last, and the earliest and latest times it can take place. Several rooms may fit. Your job is to suggest the room that lets the group start first.

## Your task

Implement `findSlot(db, people, duration, windowStart, windowEnd)` in `slot.ts`. Read the rooms and their existing bookings from SQLite. Return `{ roomId, start, end }` for the earliest available slot, or `null` if none fits. This is a search. Calling it twice with the same database and inputs should return the same result and leave the bookings unchanged.

Use integer minutes since midnight for one day. For example, 09:00 is 540 and 09:30 is 570. Assume valid inputs: positive integers for group size and duration, and `0 <= windowStart < windowEnd <= 1440`. Use the supplied schema in `database.ts`.

## Worked example

Four people want 30 minutes between 09:00 and 10:00. The starter database contains these rooms.

| Room ID | Seats | Already booked | Earliest possible start in this window |
|---|---:|---|---|
| 1 | 4 | 09:00–09:45 | None. Only 15 minutes remain. |
| 2 | 6 | 09:30–10:00 | 09:00. The meeting ends as the booking begins. |

`findSlot(db, 4, 30, 540, 600)` returns `{ roomId: 2, start: 540, end: 570 }`. If seven people attend, the result is `null` because neither room has seven seats.

## Rules

- A single room must seat everyone and be free for the entire duration. A meeting can start at the window start and end exactly at the window end.
- A booking occupies its start minute and releases the room at its end. Two meetings may touch at an endpoint.
- Choose the earliest start across all eligible rooms. If several rooms allow that start, choose the smallest numeric room ID.
- Rooms can have zero or more bookings. Bookings can overlap, arrive in any order, and extend outside the search window. Assume at most 100 rooms and 10,000 bookings in total.

## Run and submit

Use Node.js 24.x. In this folder run `npm ci`, then `npm test` and `npm run typecheck`. The example tests initially fail at the unfinished function. Implement the search, keep the supplied tests passing, and add a test for an edge case they miss.

**Submit your solution by opening a pull request (PR) against the `master` branch of this repository.**

1. Create a branch from `master`. If you do not have write access, fork the repository and create the branch in your fork.
2. Commit your implementation and tests for `candidates/meeting-slot/` and push your branch.
3. Open a PR with this repository as the base repository, `master` as the base branch, and your solution branch as the source. In the PR description, explain how you choose among rooms, how the search cost grows as bookings are added, and what your added test protects. Include the results of `npm test` and `npm run typecheck`.
