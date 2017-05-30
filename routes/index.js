//Höfundur: Gunnþór Karl Rafnsson
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'One Last Ride!' });
});

module.exports = router;
