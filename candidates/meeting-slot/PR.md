# Find the earliest available room

Group bookings that touch the interior of the search window by room and order them by start time. For each room with enough seats, start at the beginning of the window. If the meeting fits before the next booking, that is the first gap for this room. Otherwise move the possible start forward to the later of its current value and the booking end. Taking the later value handles nested bookings. Check the end of the window before accepting the slot.

Rooms are visited in ascending ID order. Replacing the best slot only for an earlier start preserves the smaller ID on ties. Once a room can start at the window start, the search can return immediately. Both queries are read-only.

For R rooms and B bookings, SQLite scans the bookings and sorts the matching ones. The room ID is the integer primary key, so rooms can be visited in ID order. Worst-case time is O(R + B log(B + 1)) and auxiliary space is O(R + B). The added tests exercise nested intervals inserted out of order, an exact gap between bookings extending beyond the window, and repeated searches for an empty room.

Run `npm test` and `npm run typecheck` in this folder.
