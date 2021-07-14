const arr = ['bill', 'lorraine', 'ron', 'chris', 'jon']

const key = {
    1: 'bill',
    2: 'lorraine',
    3: 'ron',
    4: 'chris', 
    5: 'jon'
};

/**
 * This challenge created by my dad lends itself to a tricky little programming challenge.
 * The idea is to create a rotation of pairs from a group of N individuals - the 
 * individuals rotate a scheduled 'visit' with eachother, but the problem is that each time
 * you create a new group, you need to pick pairs that don't overlap, and have also gone
 * the longest amount of time without seeing the other person in their pair. I was baffled
 * by the problem at first, then I came up with the following method...
 * Create 2 arrays, the first is static, the second rotates, beginning over end. Match up
 * the entries on each array to get your rotation. 
 * This method works with groups of any size, but in the case that there are an odd number
 * of individuals, one person will be left 'on their own' each rotation. Here I solve for
 * that by deduping the array with a new Set().
 * Et viola. 
 */
function createRotation() {
    let count = 0;

    const arr = [1, 2, 3, 4, 5];
    const rev = [...arr].reverse();

    while (count < arr.length) {
        const pairs = {};
        for (let i = 0; i < 5; i++) {
            let newKey = [...new Set([arr[i], rev[i]])]
                .sort()
                .map(int => key[int]);
            pairs[newKey] = true;
        }

        console.log(`group ${count}`, Object.keys(pairs))

        rev.unshift(rev.pop());
        count++;
    }
}

console.log(createRotation());
