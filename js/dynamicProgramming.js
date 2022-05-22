// The classic example of a dynamic programming problem is the fibonacci sequence.
// We start off with our niave recursive approach : 
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return fibonacci(n -1) + fibonacci(n - 2);
}

// however it's incredibly inefficient, O(n2)
// so we add memoization : 
const memo = new Map();
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else if (memo.get(n)) {
        return memo.get(n);
    }
    const res = fibonacci(n -1) + fibonacci(n - 2);
    memo.set(n, res);
    return res;
}

// now it's very efficient, in this case O(n)
// however. we have the problem that the call stack can grow very large because of the recursive function calls
// so we can re-write it using a 'bottom up' approach : 
function fibonacci(n){
    const arr = new Array(n).fill(1);
    for (let i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr.pop();
}
// Again O(n), and no recursion! 
// This is all well and good with the fibonacci sequence becaue it's easy to mentally hold a model of why this works, 
// however for some other recursive problems, it's much harder... 
// Enter the stiar climber problem : 
// https://leetcode.com/problems/climbing-stairs/
//      You are climbing a staircase. It takes n steps to reach the top.
//      Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
// so at first we create this niave recursive solution : 
function climbStairs(n) {
    let ways = 0;
    function _climb(start) {
        if (start === n) {
            ways++;
            return;
        }
        _climb(start + 1);
        if ((n - start) > 1) {
            _climb(start + 2);
        }
    }
    _climb(0);
    return ways;
};
// in this implementation, we're starting at step 0, and climbing 1 or 2 steps to trace all the pathways that lead to the top
// each time we reach the top we increment the paths by 1, then finally return the result of those incrementations
// makes perfect sense, but it's again terribly inefficient
// and if you think about it, you'll visit the same step over and over
// so to do the first step of creating a dynamic programmign solution with memoization, we have to reverse the order to go backwards from the top
function climbStairs(n) {
    const memo = new Map();
    function _climb(start) {
        if (start === 1 || start === 0) {
            return 1;
        } else if (memo.get(start)) {
            return memo.get(start);
        }
        memo.set(start, _climb(start - 1) + _climb(start - 2));
        return memo.get(start);
    }
    return _climb(n);
}
// already in order to do this you have to completely reverse your mental model of how this should work
// instead of tracing every path to the top, you're starting at the top, then giong backwards
// you can think of this as the nth step being the bottom step and just mentally reversing the order
// then you recursively call _climb
// the other mental shift is to realize that the paths to the end for some intermediate number start
// is equal to _climb(start - 1) + _climb(start - 2)
// if you dwell on it, it makes sense, because from start, you can step to start - 1 OR start - 2
// and therefore, the total number of paths from start is equal to the sum of those 2 possible next steps
// however, it might take just a bit of thinking to catch on to that! 
// ...
// so now that we have that, we can solve this without recursion, again like the fibonacci sequence 
function climbStairs(n) {
    const arr = new Array(n);
    arr[0] = 1;
    arr[1] = 1;
    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr.pop();
}
// in fact, it's almost exactly the same problem as the fibonacci sequence. 
// this solution is great, and has a time complexity of O(n)
// but as you can see, the difficulty is reframing the problem in your mind to recognize the overlapping subproblems
// and to come up with the optimal solution having the realization that you can simply sum the next 2 possible steps
// to get the current one. 

// so what's the trick to doing that? 
// 1) first when you're in a recursive loop of bad time complexity, you should be able to look at the problem and 
// recognize that there are overlapping subproblems. now you know that you can use DP
// 2) next : ask the question "is the result of a given step the combination of one or more sub-steps?"
// *NOTE : this reframing is the hardest part! 
// 3) once you figure out how to combine sub-steps into a solution, it should be clear how to use memoization to create 
// an efficient algorithm
// 4) If you get there quick and have extra time, then try to build the approach from the bottom up. 