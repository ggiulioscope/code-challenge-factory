import assert from 'node:assert/strict';
import test from 'node:test';
import { createDatabase } from './database.ts';
import { findSlot } from './slot.ts';

test('room 2 fits before its booking starts', t => {
  const db = createDatabase();
  t.after(() => db.close());
  assert.deepEqual(findSlot(db, 4, 30, 540, 600), { roomId: 2, start: 540, end: 570 });
});

test('a meeting can begin when a booking ends and finish at the window boundary', t => {
  const db = createDatabase();
  t.after(() => db.close());
  assert.deepEqual(findSlot(db, 4, 15, 585, 600), { roomId: 1, start: 585, end: 600 });
  assert.equal(findSlot(db, 5, 15, 585, 600), null);
});

test('equal start times are resolved by room ID', t => {
  const db = createDatabase();
  t.after(() => db.close());
  assert.deepEqual(findSlot(db, 3, 20, 600, 620), { roomId: 1, start: 600, end: 620 });
});
