var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/products', function(req, res, next) {

  res.render('admin', {
    title: "Administration"
  });

});



module.exports = router;
