var dbSQL = require('../dbSQL.js');
var doublepromise= function(){

   queryString="select* from users where id="+"'"+req.cookies.id+"'";
    dbSQL.read(queryString)
    .then(function(rows){
      if(rows.length>0)
      {
        res.locals.user = rows[0];
        let authTime=moment().format('LLLL');
        queryString="insert into accountLogin(id,timeLogin)value('"+rows[0].id+"','"+authTime+"')";
        dbSQL.write(queryString);
        
      }
      else
      {
        res.redirect('/login');
        return;
      }
    })
    ;
} 