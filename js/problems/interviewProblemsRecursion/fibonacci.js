// NOTE TO SELF ALL OF THIS CODE SUXXXX
// see my other fibbonacci file which has updated solutions
// from when i was better at programming.

function fibonacci(size){
    const series = [1];

    function _fibo(s) {
        if (s !== 0) {
            const last = series[series.length - 1] || 0;
            const twoAgo = series[series.length - 2] || 0;
            series.push(last + twoAgo);
            --s;
            return _fibo(s);
        }
         return series;
    }

    return _fibo(size - 1);
}


function fibonacci1(size, series = [1]) {
    --size;
    if (size) {
        const last = series[series.length - 1] || 0;
        const twoAgo = series[series.length - 2] || 0;
        series.push(last + twoAgo);
        return fibonacci1(size, series);
    }
    return series;
}

function fibonacci2(size) {
    const series = [1];
    while(size > 1) {
        --size;
        series.push((series[series.length - 1] || 0) + (series[series.length - 2] || 0));
    }
    return series;
}

console.log(fibonacci(10));
console.log(fibonacci1(10));
console.log(fibonacci2(10));

// NOTE TO SELF! 
// this is the classic : 
function fib(n) {
    return [1, 2].includes(n) ? 1 : fib(n - 1) + fib(n - 2);
}

console.log('recursive', fib(20))

// NOTE TO SELF! 
// this is the solution with dynamic programming :
// it runs in constant time! 
function dynamic_fib(n) {
    if ([1, 2].includes(n)) {
        return 1;
    }
    let a = 1, b = 1;
    for (i = 3; i <= n; i++) {
        const tmp = b; 
        b = a + b;
        a = tmp;
    }
    return b;
}

console.log('dynamic', dynamic_fib(20));