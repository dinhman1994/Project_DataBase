var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'project'
});

connection.connect();
var authE=[];
// function authLogin(email,password) {
   
var errors=[];
var id="'binhbg14@gmail.com'";   
var queryString="select* from users where email="+id;
console.log(queryString);
// connection.query(queryString, function (err, rows, fields) {
//   var pass1 = false;
//   var trade;
//   if (err) throw err;
//   for(i=0;i<rows.length;i++)
//     {
//       if('vv'===rows[i].email) 
//         {
//           pass1=true;
//           break;
//           trade=i;
//         }
//     }
//     if(pass1===false)
//     {
//       errors.push("NO ACCOUNT");
//       console.log(errors);
//       return;
//     }
//     else
//     {
//         queryString="select password from users";
//         connection.query(queryString, function (err, rows, fields) {
//         if (err) throw err;
//         if ('cc'===rows[trade].password)
//           return;
//         errors.push("WRONG PASSWORD");
//         console.log(errors);
//         });
//     }
    
//     });
 
  function authLogin(queryString){
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

    
  }


  authLogin(queryString)
    .then(function(rows){
       if(rows.length>0){
         console.log(1);
       }         
       else{
         console.log(0);
       } 
       
    });

   console.log(authLogin(queryString));






  // };

//  var query2=function(errors,password)
//  {
//     queryString="select password from users";
//     connection.query(queryString, function (err, rows, fields) {
//       if (err) throw err;
//       for(i=0;i<rows.length;i++)
//       {
//         if(password===rows[i].password) 
//           return;
//       }
//       errors.push("WRONG PASSWORD!");
//       console.log('Done query2');
//       });
     
//  };

// function testCallBack(email,password,callback)
// {
//     authE=callback(email,password);
// }

// var test= testCallBack('vl','cc',authLogin);
// console.log(authE);
















// connection.query('select* from users', function (err, rows, fields) {

//   if (err) throw err;
//   console.log('The solution is: ' + rows[0].fullname);
  
// });

// console.log("SUCCESSED");


//      // dbSQL.write(stringQuery);
// var stringQuery="insert into users(id,fullname,avatar,password)"+' '+"value('"+"11112"+"','"+"Duong Dinh Thai"+"','"+"VCL"+"','"+"toang"+"')";

// connection.beginTransaction(function(err) {
//   if (err) { throw err; }
//   connection.query(stringQuery, 'hello', function (error, results, fields) {
// 	    if (error) {
// 	      return connection.rollback(function() {
// 	        throw error;
// 	      });
// 	    }

//         connection.commit(function(err) {
// 	        if (err) {
// 	          return connection.rollback(function() {
// 	            throw err;
// 	          });
// 	        }
//             console.log('TRANSMITED!');
            
//         });
//    });
// });

// console.log("Finished");
 
// connection.end();

// insert into users(id,fullname,avatar) value('2222','Le Cuc','1m52')

 

// connection.beginTransaction(function(err) {
//   if (err) { throw err; }
//   connection.query('', , function (error, results, fields) {
  
 

  //   // if (error) {
  //   //   return connection.rollback(function() {
  //   //     throw error;
  //   //   });
  //   // }

// });





// connection.end();
// connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
  //   // if (error) {
  //   //   return connection.rollback(function() {
  //   //     throw error;
  //   //   });
  //   // }

  //   var log = 'Post ' + results.insertId + ' added';

  //   connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
  //     if (error) {
  //       return connection.rollback(function() {
  //         throw error;
  //       });
  //     }
  //     
  //   });
  // });