var Class1 = function (options) {
    if (typeof this.initialize === 'function') {
        this.initialize.call(this, options)
    }
    return this;
};

Class1.prototype.prop1 = 'ronald';

Class1.extend = function (options) {
    for (var key in options) {
        this.prototype[key] = options[key];
    }
    return this;
}

var Class2 = Class1.extend({
    initialize : function (options) {
        this.prop3 = options.prop3 || 'default';
        return this;
    },
    prop2 : 'donald'
});

var instance = new Class2({
    prop3 : 'chris b.'
});

console.log(instance);
console.log(instance.prop1);
console.log(instance.prop2);
console.log(instance.prop3);
