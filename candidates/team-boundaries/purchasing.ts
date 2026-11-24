import type { DatabaseSync } from 'node:sqlite';

export function cancelOrder(db: DatabaseSync, orderId: string) {
  db.prepare("UPDATE orders SET status = 'canceled' WHERE id = ?").run(orderId);
}

export function orderStatus(db: DatabaseSync, orderId: string) {
  const status = db.prepare('SELECT status FROM orders WHERE id = ?').get(orderId)?.status;
  if (status === undefined || status === 'open' || status === 'billed' || status === 'canceled') return status;
  throw new Error('Invalid stored order status');
}

export function applyInvoice(db: DatabaseSync, orderId: string) {
  db.prepare("UPDATE orders SET status = 'billed' WHERE id = ? AND status = 'open'").run(orderId);
}
