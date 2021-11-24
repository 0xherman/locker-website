var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:address(0x[a-fA-F0-9]{40})', function(req, res, next) {
  res.render('lock', { lockAddress: req.params.address });
});
module.exports = router;
