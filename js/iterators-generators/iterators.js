/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
 * Super high level dumbed down overview : 
 * There are Iterators and IteratorResults
 * An Iterator has a next method which returns an IteratorResult
 * An IteratorResult usually has just 2 properties :
 *      - value (any value)
 *      - done (boolean)
 * Note* the IteratorResult may also have result and throw methods
 * An Iterator is not also iterable unless it implements a [@@iterator]() method
 * Note* in code, the @@ is denoted as Symbol.iterator
 * The [@@iterator]() method simply returns this
 * Iterators are highly related to generators, which can use the yeild keyword.
 * Generator functions return generator objects, which are iterable Iterators.
 */
const myIterable = {
    count: 0,
    next: function() {
        // result is an IteratorResult
        const result = this.count < 5 ?
        { value: ++this.count, done: false } : 
        { done: true };
        // set the count back to zero so that the iterable can be iterated more than once
        this.count = result.done ? 0 : this.count;
        return result;
    },
    [Symbol.iterator]: function() { return this; }
}

console.log([...myIterable]); // [ 1, 2, 3, 4, 5 ]
console.log([...myIterable]); // [ 1, 2, 3, 4, 5 ]
console.log(myIterable.next()); // 1
console.log(myIterable.next()); // 2
console.log(myIterable.next()); // 3
console.log([...myIterable]); // [4, 5] !?
