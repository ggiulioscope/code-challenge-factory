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

test('nested reservations in any insertion order cannot shorten an occupied interval', t => {
  const db = createDatabase();
  t.after(() => db.close());
  db.exec(`
    INSERT INTO rooms VALUES (3, 12);
    INSERT INTO bookings VALUES (3, 550, 560), (3, 530, 580), (3, 590, 610);
  `);
  assert.deepEqual(findSlot(db, 12, 10, 540, 600), { roomId: 3, start: 580, end: 590 });
  assert.equal(findSlot(db, 12, 11, 540, 600), null);
});

test('an unbooked room can win and searching leaves it available', t => {
  const db = createDatabase();
  t.after(() => db.close());
  db.exec('INSERT INTO rooms VALUES (3, 8)');
  const expected = { roomId: 3, start: 540, end: 600 };
  assert.deepEqual(findSlot(db, 4, 60, 540, 600), expected);
  assert.deepEqual(findSlot(db, 4, 60, 540, 600), expected);
});
