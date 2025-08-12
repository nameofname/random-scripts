/**
 * Attempt 3 is going to be : 
 *  - sort the array
 *  - use left and right pointers to work in towards the middle
 */
var threeSum = function (nums) {
    const m = new Map();
    const solutions = [];

    // sort numbers
    nums.sort((a, b) => {
        if (a < b) return -1;
        else if (b < a) return 1;
        else return 0;
    });

    // count all numbers in the array
    for (let i = 0; i < nums.length; i++) {
        m.set(nums[i], (m.get(nums[i]) || 0) + 1);
    }

    // use left and right pointers to iterate the array only once
    let l = 0; r = 1, highest = nums[nums.length - 1];
    while (l < r) {
        numA = nums[l];
        numB = nums[r];
        const needed = 0 - (numA + numB);
        let neededCount = 1;
        neededCount += (numA === needed ? 1 : 0);
        neededCount += (numB === needed ? 1 : 0);
        const haveNeeded = m.get(needed);
        if (haveNeeded !== undefined && haveNeeded >= neededCount) {
            solutions.push([numA, needed, numB]);
        }
        ++l; --r;
    }

    return solutions;
}

/**
 * Attempt 2?
 * I never finished this, the idea was to simplify and do less stuff, but it got wicked complicated bro.
 */
var threeSumBakakak = function (nums) {
    // first sort your numbers
    const used = new Map();
    const m = new Map();
    const solutions = [];

    for (let i = 0; i < nums.length; i++) {
        m.set(nums[i], m.get(nums[i]) || 0 + 1);
    }

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            numA = nums[i];
            numB = nums[j];
            const needed = 0 - (numA + numB);
            let neededCount = 1;
            neededCount += (numA === needed ? 1 : 0);
            neededCount += (numB === needed ? 1 : 0);
            if (m.get(needed) !== undefined && m.get(needed) >= neededCount) {
                const solution = [numA, numB, needed];
                const min = Math.min(solution);
                const max = Math.max(solution);
                const key = `${min}-${numB}-${max}`;
                solutions.push([numA, numB, needed]);
                used.set(key, true);
            }
        }
    }

    return solutions;
}

/**
 * Here is my first attempt which only beats 5% in run time. 
 * Not great.
 */
var threeSumBak = function (nums) {
    // first sort your numbers
    const m = new Map();
    const used = new Map();
    const solutions = [];
    nums.sort((a, b) => {
        if (a < b) return -1;
        else if (b < a) return 1;
        else return 0;
    });

    for (let i = 0; i < nums.length; i++) {
        m.set(nums[i], i);
    }

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const missing = 0 - (nums[i] + nums[j]);
            if (m.get(missing) !== undefined && m.get(missing) > j) {
                // console.log('m has it', nums[i], nums[j], missing, m);
                const key = `${nums[i]}-${nums[j]}-${missing}]`;
                if (!used.get(key)) {
                    solutions.push([nums[i], nums[j], missing]);
                    used.set(key, true);
                }
            }
        }
    }
    return solutions;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
[-4,-1,-1,0,1,2]
