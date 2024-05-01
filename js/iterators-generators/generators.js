/**
 * Taking everything we know about iterators it's fairly easy
 * to understand generators. A generator function returns an 
 * instance of Generator object. The Generator constructor is 
 * not available to create a new generator, you have to use a 
 * generator function. The generator inherits from Iterable
 * so has the methods of iterable, including : 
 *      - next
 *      - return
 *      - throw
 * Next is usually the one you care about when thinking of an 
 * iterable. Creating a generator works like an iterable with a 
 * next method defined, but instaed you use the 'yeild' keyword
 * and you don't have to return an IteratorResult with a done
 * property.
 */

function* myGenerator() {
    yield 1;
    yield 2;
    yield 3;
}
const gen = myGenerator();
console.log([...gen]);
console.log([...gen]); // empty
console.log(gen.next()); // { value: undefined, done: true }

function* myGenerator1() {
    for (let i = 1; i < 4; i++) {
        yield i;
    }
}
const gen1 = myGenerator1();
console.log([...gen1]);
console.log([...gen1]); // empty
