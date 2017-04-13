var express = require('express');
var router = express.Router();
var datamanagerModule = require('../models/database');
var database = new datamanagerModule(); 

console.log('router');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'One Last Ride!'});
});


router.get('/getTrack', function(req, res, next){

  database.selectQuery( (data)=>{
    res.send(data);
  });

});




module.exports = router;