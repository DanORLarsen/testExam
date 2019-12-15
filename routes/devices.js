var express = require('express');
var router = express.Router();
var dbTools = require('../dbTool')

/* GET home page. */
router.get('/', async function(req, res, next) {
    var bulbs =await dbTools.readAllData();
  res.render('bulps', { title: 'Express', bulbs: bulbs });
});

module.exports = router;
