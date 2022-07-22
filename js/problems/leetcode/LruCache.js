class LRUCache {
    size = 0;
    m = new Map();

    constructor(capacity) {
        this.max = capacity;
        // this.size = 0;
    }

    put(key, value) {
        return 'fuck'
    }

    get(key) {
        if (!this.m.has(key)) return -1;
        return this.m.get(key);
    }
}

const c = new LRUCache(5);
console.log(c.get(4))

/**
 * ok so how to do this
 * if you use an array then you have to traverse it to find some values
 * if you use an object, then its hard to tell ordering
 * you need both kind of...
 * for the ordering, even if you used an array, you'd have to loop it.....
 * some sort of a linked list kind of makes sense
 * but then, when updating a key you'd have to loop
 * 
 * oldest = 1
 * newest = 3
 * obj  {
 *  1: { val: bla, next: 2, prev: null},
 *  2: { val: hey, next: 3, prev: 1},
 *  3: { val: ho, next: null, prev: 2},
 * }
 * 
 * get(2) : 
 * chosen = 2
 * prev = 2.prev
 * next = 2.next
 * prev.next = next
 * next.prev = prev
 * newest.next = chosen
 * newest = chosen
 */