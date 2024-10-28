var express = require('express');
var router = express.Router();
var products = require('../data/producttemplates'); // Anta att detta är en fil med produktdata

router.get('/:slug', function(req, res, next) { //:slug måste inte heta slug, kan vara exempelvis :id
  const slug = req.params.slug; // Hämta slug från URL
  const product = products[slug]; // Hämta produkt baserat på slug

  //Rendera vy för produkten, product.ejs
  res.render('product', { product });
});

module.exports = router;
