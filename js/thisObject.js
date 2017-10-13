"use strict";

// this code doesn't work in node because there is no window, and global is not used by default as window is.

this.test = 'the windows value';
console.log(this.test === window.test);

const functionExample = function (string) {
    console.log('==========================================');
    console.log('what is this?', this);
    console.log('before setting', this.test);
    this.test = string;
    console.log('after setting', this.test);
};


const obj = {
    test: 'the objects value',
    functionExample,
    subObj: {
        functionExample,
        subObj: {
            test: 'sub-sub object test',
            functionExample: function (string) {
                console.log('==========================================');
                console.log('what is this?', this);
                console.log('before setting', this.test);
                this.test = string;
                console.log('after setting', this.test);
            }
        }
    }
};

functionExample('ronald1');
obj.functionExample('ronald2');
obj.subObj.functionExample('ronald3');
obj.subObj.subObj.functionExample('ronald3');

console.log(window.test);
console.log(obj.test);
console.log(obj.subObj.test);
console.log(obj.subObj.subObj.test);

console.log('==========================================');
console.log('==========================================');
console.log('==========================================');

this.test = 'the windows value';

const arrowExample = () => {
    console.log(this.test);
};

const obj1 = {
    test: 'obj1 value',
    arrowExample
};

// 'this' will be the window in both of the following cases :
arrowExample();
obj1.arrowExample();
