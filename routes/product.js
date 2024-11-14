var express = require('express');
var router = express.Router();
var path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbfilePath = path.resolve(process.cwd(), "./db/products.db");

// Ger oss tillgång till databasen
const db = new sqlite3.Database(dbfilePath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

router.get('/:slug', function(req, res, next) { //:slug måste inte heta slug, kan vara exempelvis :id
    const slug = req.params.slug;// Hämta slug från URL
    const query = 'SELECT * FROM products WHERE slug = ?';
    

    
  
    db.get(query, [slug], (err, product) => {
      if (err) {
          return res.status(500).send('Ett fel uppstod vid hämtning av produkten.');
      }
      if (!product) {
          return res.status(404).send('Produkten hittades inte.');
      }

      

      const randomId = `SELECT * FROM products WHERE id != ? ORDER BY RANDOM() LIMIT 3`;
      db.all(randomId, [product.id], (err, randomProducts) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Fel vid hämtning av slumpmässiga produkter');
            return;
        }
      
      const viewData =  {
        title: slug,
        product,
        randomProducts
      }
      
    res.render('product', viewData);//Rendera vy för produkten, product.ejs
    });
  });
});

module.exports = router;
