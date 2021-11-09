// the classic solution for Fibonacci is recursive
// it's elegant, but the time complexity is bad
// O(n ^ n)

function fibonacci_recur(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return fibonacci_recur(n - 1) + fibonacci_recur(n - 2);
    }
}

console.log(fibonacci_recur(20));

// one way to solve this is to memoize the solutions
// to steps in the recursion so you don't have to 
// recompute them...

function fibonacci_memo(n, memo = []) {
    if (memo[n]) {
        return memo[n];
    } else {
        let result; 
        if (n === 1 || n === 2) {
            result = 1;
        } else {
            result = fibonacci_recur(n - 1) + fibonacci_recur(n - 2);
        }
        return result;
    }
}

console.log(fibonacci_memo(20));

// however, if you think about it, what you're really doing here
// is to calculate each fibonacci number in a sequence from 
// 1 to the number you want, so to do that, you can just
// do it iteritively instead of recursively

function fibonacci_iter(n) {
    let a = 1,
        b = 1;
    for (i=3; i <= n; i++) {
        const tmp = b;
        b = a + b;
        a = tmp;
    }
    return b;
}

console.log(fibonacci_iter(20)); // same answer
console.log(fibonacci_iter(100)); // completes in time (with a huge number)
