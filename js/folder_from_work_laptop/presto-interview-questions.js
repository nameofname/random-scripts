//var log = console.log;

//Array.prototype.forEach = function (func, thisArg) {
//    var len = this.length;
//    for (var i=0; i <= len; i++) {
//        func.apply(thisArg, [this[i], i, this]);
//    }
//};
//
//var arr = [1,2,3,4,5];
//
//arr.forEach(function (num, idx) {
//    //var derp = num + 1;
//    console.log('received : ', num, idx);
//});




Function.prototype.binder = function (thisArg) {
    var fun = this;
    var args = arguments;
    return function () {
        var innerArgs = arguments;
        var newArgs = [];

        for (var i=0; i < args.length; i++) {
            newArgs.push(args[i]);
        }
        for (var i=0; i < innerArgs.length; i++) {
            newArgs.push(innerArgs[i]);
        }

        return fun.apply(thisArg, newArgs)
    }
};

var arr = [1,2,3];

var derp = function (one, two) {
    console.log('the args were : ', arguments);
    console.log('this thing is : ', this.toString());
}.binder(arr, 'nerp', 'derp');

derp('number 1', 'number 2');