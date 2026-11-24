import { DatabaseSync } from 'node:sqlite';

export function createDatabase() {
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE orders (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL CHECK (status IN ('open', 'billed', 'canceled'))
    );
    CREATE TABLE invoices (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL UNIQUE REFERENCES orders(id)
    );
    INSERT INTO orders VALUES ('order-17', 'open');
  `);
  return db;
}
