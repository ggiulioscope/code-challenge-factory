import type { DatabaseSync } from 'node:sqlite';

export type Slot = { roomId: number, start: number, end: number };

export function findSlot(db: DatabaseSync, people: number, duration: number,
                         windowStart: number, windowEnd: number): Slot | null {
  if (duration > windowEnd - windowStart) return null;

  const bookingsByRoom = new Map<number, { start: number, end: number }[]>();
  const bookings = db.prepare(`
    SELECT room_id, start_min, end_min FROM bookings
    WHERE start_min < ? AND end_min > ?
    ORDER BY room_id, start_min
  `).iterate(windowEnd, windowStart);
  for (const row of bookings) {
    const roomId = Number(row.room_id);
    const intervals = bookingsByRoom.get(roomId) ?? [];
    intervals.push({ start: Number(row.start_min), end: Number(row.end_min) });
    bookingsByRoom.set(roomId, intervals);
  }

  const rooms = db.prepare('SELECT id FROM rooms WHERE capacity >= ? ORDER BY id').all(people);
  let best: Slot | null = null;
  for (const room of rooms) {
    const roomId = Number(room.id);
    let start = windowStart;
    for (const booking of bookingsByRoom.get(roomId) ?? []) {
      if (start + duration <= booking.start) break;
      start = Math.max(start, booking.end);
    }
    const end = start + duration;
    if (end <= windowEnd && (best === null || start < best.start)) {
      best = { roomId, start, end };
      if (start === windowStart) return best;
    }
  }
  return best;
}
