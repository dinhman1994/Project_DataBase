var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'newProject'
});

connection.connect();

module.exports.read=function read(queryString,errors){
    return new Promise(function(resolve, reject){

      connection.query(queryString, function (err, rows, fields){
           if(err){
            reject(err);
           }
           else{
            resolve(rows);
           }
           
      });

    });

    
};


    


module.exports.write = function (Query) {

connection.beginTransaction(function(err) {
 
  if (err) { throw err; }
  connection.query(Query, 'hello', function (error, results, fields) {
	    if (error) {
	      return connection.rollback(function() {
	        throw error;
	      });
	    }

        connection.commit(function(err) {
	        if (err) {
	          return connection.rollback(function() {
	            throw err;
	          });
	        }
            console.log('TRANSMITED!');
        });
    });
});
};