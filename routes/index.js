var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/coupon20145', function(req, res) {
  res.render('coupon');
});
module.exports = router;
