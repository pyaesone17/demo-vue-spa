var express = require('express');
var router = express.Router();
var path = require('path');
var connection =require('../model/connect');

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM `todos`', function (error, results, fields) {
		res.json(results);
	});
});

router.post('/', function(req, res, next) { 
	
	var todo  = {title : req.body.title,description : req.body.description,priorty : req.body.priorty };

	connection.query('INSERT INTO `todos`  SET ?',todo,function (error, results, fields) {
		
		if(error)
			res.json(error); 
		else
			todo.id=results.insertId;
			console.log(fields);
			res.json(todo);
	});
});

router.delete('/:id', function(req, res, next) {
	
	var itemId=req.params.id;
 	
 	connection.query('DELETE FROM `todos` WHERE id = ?',[itemId], function (error, results, fields) {
		if(error)
			res.json(error); 
		else
			console.log(fields);
			res.json(results);
	}); 
});

module.exports = router;



  