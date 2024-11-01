const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "../products.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

let sql = `
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    name TEXT,
    description TEXT,
    image TEXT,
    brand TEXT,
    sku TEXT,
    price INTEGER
  );
`;

db.run(sql);
