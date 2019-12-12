var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/devieces', function(req, res, next) {
  res.json(["Pærer", "info","discription"]);
});

module.exports = router;
