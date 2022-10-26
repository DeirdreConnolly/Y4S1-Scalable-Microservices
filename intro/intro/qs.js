var qs= require('qs');

var x = qs.parse('project[]=foo&project[]=bar');
console.log(x);
