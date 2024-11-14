// routes/api.js
var express = require('express');
var router = express.Router();
var path = require("path");
const Database = require('better-sqlite3');
const db = new Database('./db/products.db', { verbose: console.log });

// Hämta alla produkter
router.get('/api/products', (req, res) => {
  const statement = db.prepare(`
    SELECT  id,
            slug,
            name,
            description,
            url,
            brand,
            sku,
            price
    FROM products
    `);

  const products = statement.all();

  res.json(products);
});

module.exports = router;