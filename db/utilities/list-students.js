const sqlite3 = require("sqlite3").verbose();

// Ger oss tillgång till databasen
const db = new sqlite3.Database(
  "../products.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

// SQL - Structured Query Language
const sql = `
  SELECT * 
    FROM products
`;

/*
const sql = `
  SELECT id,
         first_name,
         last_name,
         social_security_number,
         email,
         phone_number
    FROM students
`;
*/

db.all(sql, [], function (error, rows) {
   rows.forEach(row => {
     console.log(row.name);
   });
});