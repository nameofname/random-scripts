"use strict";

// this code doesn't work in node because there is no window, and global is not used by default as window is.

this.test = 'the windows value';

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

functionExample('ronald1'); // this = window
obj.functionExample('ronald2'); // this = obj
obj.subObj.functionExample('ronald3'); // this = obj.subObj
obj.subObj.subObj.functionExample('ronald3'); // this = obj.subObj.subObj

console.log(window.test);
console.log(obj.test);
console.log(obj.subObj.test);
console.log(obj.subObj.subObj.test);
