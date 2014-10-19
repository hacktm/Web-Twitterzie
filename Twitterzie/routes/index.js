var express = require('express');
var router = express.Router();
var stream = require('../twiter pull/Stream.js');

router.get('/', function(req, res) {
  res.render('index', { poem: stream.pool });
});

module.exports = router;
