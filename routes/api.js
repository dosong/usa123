var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
var db = mongo.db("mongodb://usa123:F3HLkygWA7@ds053597.mongolab.com:53597/heroku_app27003513", {native_parser:true});

/* GET users listing. */
router.post('/addCustomer', function(req, res) {
  console.log(req.body);
  var date = new Date();
  console.log(date);
  var newCustomer = {
    name: req.body.name,
    phone: req.body.phone,
    city: req.body.city,
    time: date
  };
  db.collection('customers').insert(newCustomer, function(err, result){
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

router.post('/getCustomers', function(req, res) {
  console.log(req.body);
  var pos;
  if (parseInt(req.body.pos) > 0) {
    pos = parseInt(req.body.pos);
  }
  else {
    pos = 0;
  }
  db.collection('customers').find().sort({time: -1}).skip(pos).limit(10).toArray(function (err, items) {
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
