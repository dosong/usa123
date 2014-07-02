var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
var db = mongo.db("mongodb://usa123:F3HLkygWA7@ds053597.mongolab.com:53597/heroku_app27003513", {native_parser:true});

/* GET users listing. */
router.post('/addCustomer', function(req, res) {
  console.log(req.body);
  var userdata = req.body;
  db.collection('customers').insert(userdata, function(err, result){
    if(err === null) {
      res.send({
        success: true,
        err: null
      });
    }
    else {
      res.send({
        success: false,
        err: err
      });
    }
  });
});

router.get('/getCustomers', function(req, res) {
  console.log(req.body);
  db.collection('customers').find().toArray(function (err, items) {
    if(err){
      console.log(err);
    }
    else{
      res.send(items);
    }

  });
});

router.post('/deleteCustomer', function(req, res) {
  console.log(req.body);
  var userToDelete = req.body.id;
    db.collection('customers').removeById(userToDelete, function(err, result) {
      if(err === null) {
        res.send({
          success: true,
          err: null
        });
      }
      else {
        res.send({
          success: false,
          err: err
        });
      }
    });
});

module.exports = router;
