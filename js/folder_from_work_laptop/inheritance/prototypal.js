var Class1 = function (options) {
    this.prop1 = 'ronald';

    this.initialize = function () {
        console.log('initialize');
        for (var key in options) {
            this[key] = options[key];
        }
        return this;
    }

    if (typeof this.initialize === 'function') {
        this.initialize.apply(this, options);
    }

    return this; 
}


var Class2 = function () {};
Class2.prototype = new Class1({
    option1 : 'donald'
});

var instance = new Class2();

console.log(instance);
console.log(instance.prop1);
console.log(instance.option1);
