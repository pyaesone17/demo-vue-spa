var express = require('express');
var router = express.Router();
var path = require('path');
var connection =require('../model/connect');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname,'../public/test.html'));
});

router.post('/', function(req, res, next) {
  res.send(req.body.input1+req.body.input2);
});

module.exports = router;

// connection.query('SELECT * FROM `posts`', function (error, results, fields) {
// 	res.send(results);
// });  