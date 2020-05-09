// var minutes = 1000 * 60;
// var hours = minutes * 60;
// var days = hours * 24;
// var years = days * 365;
// var d = new Date();
// var t = d.getTime();

// var y = Math.round(t / years);

// console.log(d);
// console.log(t);
// console.log(y);


var moment=require('moment');
var now = new Date();
var authTime=moment().format('LLLL');

// var authTime=moment();

console.log("Now is"+authTime);
console.log(now.setHours(16));

// console.log(now.toLocaleDateString());

// console.log(now.setDate());

//console.log(now.getMinutes());

