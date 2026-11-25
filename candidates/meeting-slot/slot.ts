import type { DatabaseSync } from 'node:sqlite';

export type Slot = { roomId: number, start: number, end: number };

export function findSlot(db: DatabaseSync, people: number, duration: number,
                         windowStart: number, windowEnd: number): Slot | null {
  throw new Error('Implement findSlot');
}
