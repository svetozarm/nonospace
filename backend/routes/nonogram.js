var express = require('express');
var router = express.Router();

/*
  TODO: Fix this
*/
router.get('/', function(req, res, next) {
  res.send('default nono response');
});

module.exports = router;
