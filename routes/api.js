var express = require('express');
var router = express.Router();
var LockService = require('../services/locks');

router.get('/:address/unlockDate', async function(req, res, next) {
  let locksvc = new LockService();
  try {
    let date = await locksvc.getUnlockDate(req.params.address);
    res.json({ unlockDate: date });
  }
  catch(ex) {
    res.json({ error: "Invalid lock address" });
  }
});

module.exports = router;
