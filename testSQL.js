// var dbSQL = require('../dbSQL.js');
// var doublepromise= function(){

//    queryString="select* from users where id="+"'"+req.cookies.id+"'";
//     dbSQL.read(queryString)
//     .then(function(rows){
//       if(rows.length>0)
//       {
//         res.locals.user = rows[0];
//         let authTime=moment().format('LLLL');
//         queryString="insert into accountLogin(id,timeLogin)value('"+rows[0].id+"','"+authTime+"')";
//         dbSQL.write(queryString);
        
//       }
//       else
//       {
//         res.redirect('/login');
//         return;
//       }
//     })
//     ;
var apartment = {
  bedroom: {
    area: 20,
    bed: {
      type: 'twin-bed',
      price: 100
    }
  }
};

function deepEntries( obj ){
    'use-strict';
    var allkeys, curKey = '[', len = 0, i = -1, entryK;

    function formatKeys( entries ){
       entryK = entries.length;
       len += entries.length;
       while (entryK--)
         entries[entryK][0] = curKey+JSON.stringify(entries[entryK][0])+']';
       return entries;
    }
    allkeys = formatKeys( Object.entries(obj) );

    while (++i !== len)
        if (typeof allkeys[i][1] === 'object' && allkeys[i][1] !== null){
            curKey = allkeys[i][0] + '[';
            Array.prototype.push.apply(
                allkeys,
                formatKeys( Object.entries(allkeys[i][1]) )
            );
        }
    return allkeys;
};

console.log(deepEntries(apartment));
