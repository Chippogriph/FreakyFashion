var express = require('express');
var router = express.Router();
var path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbfilePath = path.resolve(process.cwd(), "./db/products.db");

// Ger oss tillgång till databasen
const db = new sqlite3.Database(dbfilePath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

/* GET home page. */
router.get("/", function (request, response, next) {

  const query = `
  SELECT *
    FROM products
  `;
  
  db.all(query, [], function (err, products) {
  const viewData =  {
    title: "Freaky Fashion",
    products
  }
    response.render("index", viewData);

  });

});

module.exports = router;
