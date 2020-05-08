var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'project'
});

connection.connect();

module.exports.authLogin=function authLogin(queryString,errors){
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



module.exports.readLogin = function (reqBody,done) {
   
    var errors=[];   
    var queryString="select email from users";
	connection.query(queryString, function (err, rows, fields) {
      if (err) throw err;
      for(i=0;i<rows.length;i++)
      {
      	if(reqBody.email===rows[i].email) 
      		{

      			connection.query(queryString, function (err, rows, fields) {
			      if (err) throw err;
			      for(i=0;i<rows.length;i++)
			      {
			      	if(reqBody.password===rows[i].password) 
			      		return;
			      }
			      errors.push("WRONG PASSWORD!");
			      done=true;
			      return;
	            });
                  
            }
	    
	  }
      errors.push("NO ACCOUNT");
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