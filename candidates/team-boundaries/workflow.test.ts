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
