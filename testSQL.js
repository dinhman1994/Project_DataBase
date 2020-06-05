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

function callback(fact,)
{

};

let test= function read(fact,errors)
{
  return new Promise(function(resolve,reject){

  });   
}