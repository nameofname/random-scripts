"use strict";

const go = async () => (new Promise(resolve => resolve('ronald did this')));

const der = async () => {
    const res = await go();
    console.log(res);
};

// der();

/**
 * Testing with closure context - when you invoke an async function it
 * does not loose the context of the closure it was executed in. In this case, 
 * the int variable is maintained through multipel async boundaries. 
 */
async function doSomething(int) {
    console.log('doSomething 1', int);
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('doSomething 2', int);
            resolve('ronald');
        });
    });
}
async function asyncWrapper(int) {
    console.log('asyncWrapper 1', int);
    go().then(async (res) => {
        console.log('asyncWrapper 2', res, int);
        doSomething(int).then(res1 => {
            console.log('asyncWrapper 3', res1, int);
        });
    });
}

asyncWrapper(5);