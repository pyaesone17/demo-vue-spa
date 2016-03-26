var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('todos', {
    	id: { type: 'int', primaryKey: true ,autoIncrement: true},
    	title: 'string',
    	description : 'text',
    	priorty : 'int'
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('todos', callback);
};
