/**
 * Is Promise.all() faster than concurrent promises done like so? 
 * const promiseA = requestSomething();
 * const promiseB = requestSomething();
 * return [ await promiseA, await promiseB ];
 * Answer: they're the same.
 */

async function timer(callback, timerName) {
    console.time(timerName);
    await callback();
    console.timeEnd(timerName);
}

async function slowThing() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done');
        }, 500);
    });
}

async function testA() {
    const promiseA = slowThing();
    const promiseB = slowThing();
    return [ await promiseA, await promiseB ];
}

async function testB() {
    const promiseA = slowThing();
    const promiseB = slowThing();
    return Promise.all([ promiseA, promiseB ]);
}


timer(testB, 'timerB');
timer(testA, 'timerA');
