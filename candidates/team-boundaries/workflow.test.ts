import test from 'node:test';
import assert from 'node:assert/strict';
import { createDatabase } from './database.ts';
import { cancelOrder, orderStatus } from './purchasing.ts';
import { recordInvoice, invoiceFor } from './finance.ts';

test('Finance records the first invoice and Purchasing sees the order as billed', t => {
  const db = createDatabase();
  t.after(() => db.close());
  recordInvoice(db, 'inv-42', 'order-17');
  assert.equal(invoiceFor(db, 'order-17'), 'inv-42');
  assert.equal(orderStatus(db, 'order-17'), 'billed');
});

test('Purchasing cancels an open order', t => {
  const db = createDatabase();
  t.after(() => db.close());
  cancelOrder(db, 'order-17');
  assert.equal(orderStatus(db, 'order-17'), 'canceled');
});

test('Finance retains a late invoice and Purchasing preserves cancellation', t => {
  const db = createDatabase();
  t.after(() => db.close());
  cancelOrder(db, 'order-17');
  recordInvoice(db, 'inv-late', 'order-17');
  assert.equal(invoiceFor(db, 'order-17'), 'inv-late');
  assert.equal(orderStatus(db, 'order-17'), 'canceled');
});

test('an interrupted Purchasing update rolls back the invoice and allows retry', t => {
  const db = createDatabase();
  t.after(() => db.close());
  db.exec("CREATE TRIGGER fail_update BEFORE UPDATE ON orders BEGIN SELECT RAISE(ABORT, 'interrupted'); END");
  assert.throws(() => recordInvoice(db, 'inv-42', 'order-17'), /interrupted/);
  assert.equal(invoiceFor(db, 'order-17'), undefined);
  assert.equal(orderStatus(db, 'order-17'), 'open');
  db.exec('DROP TRIGGER fail_update');
  recordInvoice(db, 'inv-42', 'order-17');
  assert.equal(orderStatus(db, 'order-17'), 'billed');
});
