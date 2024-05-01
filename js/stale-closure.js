const EventEmitter = require('events');
const e = new EventEmitter();

let thing = 0;
let bound = false;

/**
 * Shows the stale closure problem where a closure gets the value of a variable in
 * the outer function scope, and subsequent updates to the variable are not reflected
 * by repeated calls to the closure. 
 */
function outer() {
    const innerThing = ++thing;
    function inner() {
        console.log('the value of thing from inner : ', innerThing);
    }
    if (!bound) {
        e.on('trigger', inner);
        bound = true;
    }
    console.log('the value of thing that was defined : ', innerThing);
}

outer();
e.emit('trigger');
outer();
e.emit('trigger');
e.emit('trigger');
++thing;
e.emit('trigger');
outer();
outer();
e.emit('trigger');
