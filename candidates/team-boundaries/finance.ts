import type { DatabaseSync } from 'node:sqlite';

export function recordInvoice(db: DatabaseSync, invoiceId: string, orderId: string) {
  db.prepare('INSERT INTO invoices (id, order_id) VALUES (?, ?)').run(invoiceId, orderId);
  db.prepare("UPDATE orders SET status = 'billed' WHERE id = ?").run(orderId);
}

export function invoiceFor(db: DatabaseSync, orderId: string) {
  const id = db.prepare('SELECT id FROM invoices WHERE order_id = ?').get(orderId)?.id;
  if (id === undefined || typeof id === 'string') return id;
  throw new Error('Invalid stored invoice ID');
}
