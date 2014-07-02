var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/d326145af2771ef023fe', function(req, res) {
  res.render('customers');
});
module.exports = router;
