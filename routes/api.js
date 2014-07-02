var express = require('express');
var http = require('http');
var router = express.Router();

var options = {
  hostname: '218.244.141.224',
  port: 8080,
  path: '/yozaii2/api/auth.action',
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4"
  }
};

var httpReq = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
httpReq.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

/* GET users listing. */
router.post('/', function(req, res) {

  var data = {
    "username": "sss",
    "password": "ss"
  };
  options = {
    hostname: '218.244.141.224',
    port: 8080,
    path: '/yozaii2/api/auth.action',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
      "Content-Length": JSON.stringify(data).length
    }
  };
  httpReq = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  // console.log(JSON.stringify(data));
  httpReq.end(JSON.stringify(data));
  res.send({'result': false});
});

module.exports = router;
