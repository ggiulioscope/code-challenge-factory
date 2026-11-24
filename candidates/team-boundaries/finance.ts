import type { DatabaseSync } from 'node:sqlite';
import { applyInvoice } from './purchasing.ts';

export function recordInvoice(db: DatabaseSync, invoiceId: string, orderId: string) {
  db.exec('SAVEPOINT record_invoice');
  try {
    db.prepare('INSERT INTO invoices (id, order_id) VALUES (?, ?)').run(invoiceId, orderId);
    applyInvoice(db, orderId);
    db.exec('RELEASE record_invoice');
  } catch (error) {
    db.exec('ROLLBACK TO record_invoice; RELEASE record_invoice');
    throw error;
  }
}

export function invoiceFor(db: DatabaseSync, orderId: string) {
  const id = db.prepare('SELECT id FROM invoices WHERE order_id = ?').get(orderId)?.id;
  if (id === undefined || typeof id === 'string') return id;
  throw new Error('Invalid stored invoice ID');
}
