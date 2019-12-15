var express = require('express');
var router = express.Router();
var db = require('../dbTool')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Express' });
});

router.post('/', async(req, res, next) => {

    var id = req.body.id;
    var type = req.body.typenummer;
    var soft = req.body.softwareVersion;
    var name = req.body.name;
    var farve = req.body.farve;
    var intensitet = req.body.lysintensitet
    var select = req.body.select;
    console.log(req.body)
  
    var dataArray = [id, type, soft, name, intensitet, farve,  select];
     db.createBulp(dataArray);
    await db.updateBulp(dataArray);
    res.redirect("/devices");
  })

module.exports = router;