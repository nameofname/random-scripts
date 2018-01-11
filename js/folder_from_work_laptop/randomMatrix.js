/*
* A function to create a randomized two dimensional array:
* */

function randomMatrix() {
    var self = this;
    self.x = 10;
    self.y = 10;
    self.num = 10;
    self.randoms = [];
    self.matrix = [];
    // creates an array of random x-y coordinates
    self.newRandomSet = function() {
        for (var i=0; i<num; i++) {
            var x = self.newRandom();
            var y = self.newRandom();
            var xy = x + '-' +  y;
            if (!randoms.indexOf(xy)) {
                randoms.push(xy);
            }
        }
    }
    self.newRandom = function() {
        var n = Math.floor((Math.random() * self.num) + 1);
        return n;
    }
    // creates the matrix:
    self.newMatrix = function() {
        while (randoms.length < self.num) {
            self.newRandomSet();
        }
        for (var x=0; x < self.x; x++) {
            if (typeof matrix[x] == 'undefined') {
                matrix[x] = [];
            }
            for (var y=0; y<self.y; y++) {
                var val = arr.indexOf(x + '-' + y) ? true : false;
                self.matrix[x][y] = (val);
            }
        }
    }
    self.getNewMatrix = function(x,y,num) {
        self.x = x;
        self.y = y;
        self.num = num;
        return self.newMatrix();
    }
}

var matrixMaker = new randomMatrix();
var matrix = matrixMaker.getNewMatrix(100, 100, 500);