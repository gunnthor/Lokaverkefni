var express = require('express');
var router = express.Router();
var datamanagerModule = require('../models/database');
var database = new datamanagerModule(); 

console.log('router');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'One Last Ride!'});
});

router.get('/getMapCount', function(req, res, next){

  database.getIdCount( (data)=>{
    res.send(data);
  });

});

router.get('/deleteTrack', function(req, res, next) {
  console.log('track deleted i hope')
  database.deleteQuery();
});



router.get('/getTrack', function(req, res, next){
  console.log('router tekur við info í getTrack og það segir:');
  console.log(req.query);

  database.selectQuery(req.query, (data)=>{
    res.send(data);
  });

});

router.post('/saveTrack', function(req, res, next){
	console.log('router tekur við info og það segir:');
	console.log(req.body);

	database.insertData(req.body);

  // database.insertData( (data)=>{
  //   res.send(data);
  // });

});

module.exports = router;