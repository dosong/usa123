var express = require('express');
var router = express.Router();
var path = require('path');

//release beta version
router.get('/ios',function(req, res) {
  res.render('ios-beta');
})
router.get('/android/down.myapp.com', function(req, res) {
  res.download(path.resolve(__dirname,'../app-beta/yohelper.apk'));
});
router.get('/yo.plist', function(req, res) {
  res.download(path.resolve(__dirname,'../app-beta/yo.plist'));
});
router.get('/yo.ipa', function(req, res) {
  res.download(path.resolve(__dirname,'../app-beta/yo.ipa'));
});
module.exports = router;
