import type { DatabaseSync } from 'node:sqlite';
import { invoiceFor } from './finance.ts';

export function cancelOrder(db: DatabaseSync, orderId: string) {
  db.prepare("UPDATE orders SET status = 'canceled' WHERE id = ?").run(orderId);
}

export function orderStatus(db: DatabaseSync, orderId: string) {
  const status = db.prepare('SELECT status FROM orders WHERE id = ?').get(orderId)?.status;
  if (status === undefined || status === 'canceled' || status === 'billed') return status;
  if (status !== 'open') throw new Error('Invalid stored order status');
  return invoiceFor(db, orderId) === undefined ? 'open' : 'billed';
}
