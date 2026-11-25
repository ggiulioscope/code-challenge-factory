import { DatabaseSync } from 'node:sqlite';

export function createDatabase() {
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE rooms (id INTEGER PRIMARY KEY, capacity INTEGER NOT NULL);
    CREATE TABLE bookings (
      room_id INTEGER NOT NULL REFERENCES rooms(id),
      start_min INTEGER NOT NULL,
      end_min INTEGER NOT NULL CHECK (start_min < end_min)
    );
    INSERT INTO rooms VALUES (1, 4), (2, 6);
    INSERT INTO bookings VALUES (1, 540, 585), (2, 570, 600);
  `);
  return db;
}
