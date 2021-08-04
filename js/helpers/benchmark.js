function timer(callback) {
    const start = Date.now();
    callback();
    const end = Date.now();
    return end - start;
}

function benchmark(callback, runs) {
    const times = [];
    for (let i = 0; i < runs; i++) {
        times.push(timer(callback));
    }
    // console.log(JSON.stringify(times))
    return times.reduce((c, acc) => acc + c, 0) / times.length;
}

module.exports = { timer, benchmark };
