import type { DatabaseSync } from 'node:sqlite';

export function recordDelivery(db: DatabaseSync, orderId: number, quantity: number): number {
  throw new Error('Implement recordDelivery');
}
