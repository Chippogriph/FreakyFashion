var express = require('express');
var router = express.Router();
var path = require("path");

const Database = require('better-sqlite3');
const db = new Database('./db/products.db', { verbose: console.log });

router.get('/products/new', function(req, res, next) {
  res.render('new-product', { title: 'Administration' });
});

router.post('/products/new', (req, res) => {

  console.log("POST mottagen")

  const product = {
    slug: generateSlug(req.body.name),
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    brand: req.body.brand,
    sku: req.body.sku,
    price: parseInt(req.body.price),
  };

  function generateSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  };

  const priceIsNaN = isNaN(product.price);

  if (priceIsNaN) {
    console.error("Invalid price entered.");
    return res.status(400).send("Invalid price entered.");
  }

  try {
    db.prepare(
      `
      INSERT INTO products (slug, name, description, url, brand, sku, price)
      VALUES (@slug, @name, @description, @url, @brand, @sku, @price)`
    ).run(product);
    
    res.redirect('/admin/products');

  } catch (error) {
    
    console.error("Error inserting product:", error);
    res.status(500).send("Error inserting product.");
  }
  
});
  
module.exports = router;
