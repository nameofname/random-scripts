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
        const last = series[series.length - 1] || 0;
        const twoAgo = series[series.length - 2] || 0;
        series.push(last + twoAgo);
    }
    return series;
}

console.log(fibonacci(10));
console.log(fibonacci1(10));
console.log(fibonacci2(10));