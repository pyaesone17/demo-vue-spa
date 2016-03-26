var express = require('express');
var router = express.Router();
var path = require('path');
var connection =require('../model/connect');
var ORM=require('../model/customOrm');

/* GET users listing. */
router.get('/', function(req, res, next) {
	
	var orm=new ORM('todos');

	orm.fetch(function(row){  res.json(row); });

});


module.exports = router;



  