var _ = require('underscore');

var ArrayTransformer = function (twoDimArray) {
    this.store = [];
    this.width = twoDimArray[0].length;
    this.height = twoDimArray.length;
    var _store = this.store;

    _.each(twoDimArray, function (arr) {
        _.each(arr, function (val) {
            _store.push(val);
        });
    });

    this.getValue = function (x, y) {
        if (x >= this.width || y >= this.height) {
            throw new Error('trying to get a value outside of range.');
        }
        var index = this.width * y + x;
        return this.store[index];
    };

    // Accepts 2 points, each should be an array representing an [x, y] coordinate
    this.sumSquare = function (point1, point2) {
        var x1 = point1[0];
        var x2 = point2[0];
        var y1 = point1[1];
        var y2 = point2[1];
        var currValue;
        var out = 0;

        for (var x = x1; x <= x2; x++) {
            for (var y = y1; y <= y2; y++) {
                currValue = this.getValue(x, y);
                out += currValue; 
            }
        }

        return out; 
    };

    return this; 
};

var matrix = [
    [1, 2, 3, 5, 7, 11, 13],
    [17, 19, 23, 29, 31, 37, 41], 
    [43, 47, 53, 59, 61, 67, 71], 
    [73, 79, 83, 89, 97, 101, 103]
];

var a = new ArrayTransformer(matrix); 
console.log(a.getValue(2, 3));

console.log(a.sumSquare([0, 0], [1, 1]));
