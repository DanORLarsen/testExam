var express = require('express');
var router = express.Router();
var db = require('../dbTool')

/* GET bulps listing. */
router.get('/devices', async function(req, res, next) {
var result = await db.readAllData();
console.log(result[0].id)
 res.json(result);
});

module.exports = router;
