const baudio = require('baudio');

var n = 0;
var b = baudio(function (t) {
    var x = Math.sin(t * 262 + Math.sin(n));
    n += Math.sin(t);
    console.log(t, x, n)
    return x;
});
b.play();


//var n = 0;
//var b = baudio((t) => {
//    n++;
//    return n;
//})
//b.play();
