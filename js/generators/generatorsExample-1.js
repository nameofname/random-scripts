/**
 * So they're basically functions that you can call over and over until they stop yeilding someting
 * Unlike a regular function, they can yeild different values for different invocations,
 *  given the same arguments, and without any side effects or extra state variables. 
 * And weirdly, you can iterate a generator, so generators behave like iterables, even thpugh they're functions
 *  ie. spread operator, for/of work on them. 
 * Alternatively, you can directly call the .next() method on a generator's return value. 
 * A couple other oddities: 
 *      - The generator is paused whenever yeild is invoked
 *      - You can pass values into the iterator's .next() and it will yeild that instead (very weird)
 */