import assert from 'node:assert/strict';
import test from 'node:test';
import { createDatabase } from './database.ts';
import { recordDelivery } from './delivery.ts';

test('an oversized delivery leaves the last unit available', t => {
  const db = createDatabase();
  t.after(() => db.close());
  assert.equal(recordDelivery(db, 17, 4), 6);
  assert.equal(recordDelivery(db, 17, 5), 1);
  assert.throws(() => recordDelivery(db, 17, 2));
  assert.equal(recordDelivery(db, 17, 1), 0);

  const rows = db.prepare('SELECT quantity FROM deliveries WHERE order_id = 17 ORDER BY quantity').all();
  assert.deepEqual(rows.map(row => row.quantity), [1, 4, 5]);
  assert.equal(db.prepare('SELECT ordered_quantity FROM orders WHERE id = 17').get()?.ordered_quantity, 10);
});

test('orders have independent balances', t => {
  const db = createDatabase();
  t.after(() => db.close());
  assert.equal(recordDelivery(db, 17, 3), 7);
  assert.equal(recordDelivery(db, 18, 3), 0);
  assert.throws(() => recordDelivery(db, 18, 1));
});

test('separate arrivals can have the same quantity and rejected inputs add no history', t => {
  const db = createDatabase();
  t.after(() => db.close());
  assert.equal(recordDelivery(db, 17, 4), 6);
  for (const quantity of [0, -1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => recordDelivery(db, 17, quantity));
  }
  assert.throws(() => recordDelivery(db, 999, 1));
  assert.equal(recordDelivery(db, 17, 4), 2);
  const rows = db.prepare('SELECT order_id, quantity FROM deliveries ORDER BY id').all();
  assert.deepEqual(rows.map(row => [row.order_id, row.quantity]), [[17, 4], [17, 4]]);
});
