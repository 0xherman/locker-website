var express = require('express');
var router = express.Router();
var LockService = require('../services/locks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:address(0x[a-fA-F0-9]{40})', function(req, res, next) {
  res.render('lock', { lockAddress: req.params.address });
});

router.get('/:name', async function(req, res, next) {
  let locksvc = new LockService();
  let lockAddress = await locksvc.getLockAddress(req.params.name);
  console.log(lockAddress);
  res.render('lock', { lockAddress: lockAddress });
})
module.exports = router;
