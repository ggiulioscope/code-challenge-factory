import { DatabaseSync } from 'node:sqlite';

export function createDatabase() {
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY,
      ordered_quantity INTEGER NOT NULL CHECK (ordered_quantity > 0)
    );
    CREATE TABLE deliveries (
      id INTEGER PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      quantity INTEGER NOT NULL CHECK (quantity > 0)
    ) STRICT;
    CREATE INDEX deliveries_by_order ON deliveries(order_id);
    INSERT INTO orders VALUES (17, 10), (18, 3);
  `);
  return db;
}
