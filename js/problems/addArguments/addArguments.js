"use strict";


/**
 * add(1, 2, 3) // 6
 * add(1)(2, 3) // 6
 * add(1, 2)(3) // 6
 * add(1)(2)(3) // 6
 */
function addArgs() {
    const args = Array.from(arguments);
    if (args.length > 2) {
        return args
            .slice(0, 3)
            .reduce((prev, int) => prev + int, 0);
    } else {
        return function() {
            const newArgs = Array.from(arguments);
            const allArgs = [...args, ...newArgs];
            return addArgs.apply(null, allArgs);
        }
    }
}


console.log(addArgs(1)(2, 3));
console.log(addArgs(1)(2)(3));