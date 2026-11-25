import type { DatabaseSync } from 'node:sqlite';

export function recordDelivery(db: DatabaseSync, orderId: number, quantity: number): number {
  if (!Number.isSafeInteger(quantity) || quantity <= 0) {
    throw new Error('Quantity must be a positive safe integer');
  }

  const order = db.prepare(`
    SELECT ordered_quantity - (
      SELECT COALESCE(SUM(quantity), 0) FROM deliveries WHERE order_id = orders.id
    ) AS remaining
    FROM orders WHERE id = ?
  `).get(orderId);
  if (!order) throw new Error('Order does not exist');
  const remaining = Number(order.remaining);
  if (quantity > remaining) throw new Error('Delivery exceeds the outstanding quantity');

  db.prepare('INSERT INTO deliveries (order_id, quantity) VALUES (?, ?)').run(orderId, quantity);
  return remaining - quantity;
}
