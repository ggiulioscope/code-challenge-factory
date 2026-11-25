import { DatabaseSync } from 'node:sqlite';

export function createDatabase() {
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY,
      ordered_quantity INTEGER NOT NULL CHECK (ordered_quantity > 0)
    );
    INSERT INTO orders VALUES (17, 10), (18, 3);
  `);
  // Add the deliveries table here.
  return db;
}
