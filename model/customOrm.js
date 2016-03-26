var connection =require('./connect');

function ORM(tablename){
	
	this.select="*";

	this.table=tablename;
	
	this.find=function(){
		return query();
	};

	this.all=function(){

		return this.fetch();

	};

	this.getQuery=function(){

		return query(this.select,this.table);		
	};

	this.fetch=function(callback){

		connection.query(this.getQuery(), function (error, results, fields) {
			
			if (results.length  > 0) {

	            callback(results);
	        }
		});

			
	};

	var cb=function(result){
    	
    	return result;

	}

	var query=function(select,table){
		return "SELECT "+select+" FROM "+table;
	};

}

module.exports = ORM;