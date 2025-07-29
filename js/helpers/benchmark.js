const timer = require('./timer');

/**
 * Run a function N times and average the runtimes.
 */
function benchmark(callback, runs) {
    const times = [];
    for (let i = 0; i < runs; i++) {
        times.push(timer(callback));
    }
    return times.reduce((c, acc) => acc + c, 0) / times.length;
}

module.exports = { timer, benchmark };
