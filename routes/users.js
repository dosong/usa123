var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);
  res.send({'result': false});
});

module.exports = router;
