var list1=['1','2','3','4'];
var list2=['1','2'];
var pos;
console.log(list2);
for(list of list2)
{
   if(list1.indexOf(list)>-1)
   {
    pos=list1.indexOf(list);
    list1.splice(pos,1);
   }
};

console.log(list1);


var list3={[
  {1:'1'};
  {2:'2'};
  {3:'3'}
]};

var list4=Array.from(list3);
for(list5 of list4)
{
  console.log(list5);
};
console.log(list4);