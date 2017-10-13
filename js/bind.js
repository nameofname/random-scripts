"use strict";


Function.prototype.elBindo = function (context) {
    const self = this;
    return function () {
        return self.call(context, arguments);
    }
};


var obj = {
    testval: 'val 1'
};

var fun = function () {
    console.log('and this is ... ', this)
    console.log('this.testval', this.testval)
};

var testFunc1 = fun.elBindo(obj);


testFunc1('an argument')
