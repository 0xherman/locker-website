var express = require('express');
var router = express.Router();
var LockService = require('../services/locks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tokenlock' });
});

router.get('/:address(0x[a-fA-F0-9]{40})', function(req, res, next) {
  res.render('lock', { lockAddress: req.params.address });
});

router.get('/:name', async function(req, res, next) {
  let locksvc = new LockService();
  try {
    let lockAddress = await locksvc.getLockAddress(req.params.name);
    res.render('lock', { lockAddress: lockAddress });
  }
  catch (ex) {
    res.render('lock', { lockAddress: 0x0 })
  }
})
module.exports = router;
