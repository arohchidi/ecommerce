var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('default/about', { title: 'iShop' });
});

module.exports = router;