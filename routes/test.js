var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/test-redirect', function(req, res, next) {

    console.log("Omdirigerar till /admin/products");
    res.redirect('/admin/products');

});



module.exports = router;
