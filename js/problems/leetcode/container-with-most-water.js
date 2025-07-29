// https://leetcode.com/problems/container-with-most-water/
/**
 * This solution is too slow to pass
 * @param {number[]} height
 * @return {number}
 */
var maxArea_bad = function(height) {
    let max = 0;
    let loops = 0;
    for (let i = 1; i < height.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            ++ loops;
            const h = height[j] < height[i] ? height[j] : height[i];
            const l = i - j;
            const area = l * h
            // console.log(i, j, ' -- ', l, h, area);
            max = area > max ? area : max;
        }
    }
    // console.log('OLD loops', loops);
    return max;
};

/**
 * This one seems smarter but actually has worse time complexity
 * The idea is instead of moving the right post right, and then moving the left back to 1
 * ... you're choosing each line as the new middle and searching outwards
 * But if you think about it, this approach discovers just as many combos as the last
 * ... and it's actually double counting a few... which I could fix, but it's not worth it. 
 * @param {number[]} height
 * @return {number}
 */
function maxArea_bad1(height) {
    let l, r;
    let max = 0;
    let loops = 0;

    for (let i = 1; i < height.length; i++) {
        l = i, r = i;
        let currTurn = 'l';

        while (l >= 0 && r < height.length) {
            ++loops;

            const h = height[l] < height[r] ? height[l] : height[r];
            const area = h * (r - l);
            max = area > max ? area : max;
            // console.log('checking', height[l], height[r], h, area);
            if (area > max) {
                // console.log('got it', l, r, h, area);
                max = area;
            }

            if (currTurn === 'l') {
                l--;
                currTurn = 'r';
            } else {
                r++;
                currTurn = 'l';
            }
        }
    }
    // console.log('NEW loops', loops);
    return max;
}

/**
 * This solution works! However it's much slower than other submissions.
 * OK I FIGURED OUT WHY THIS SOLUTION IS SO SLOW...
 * I'm doing way more work than I need to
 * I'm checking each height, and finding the lines taht intersect
 * However, you just need to work in from the outside
 * There's a simple solution type to this kind of problem called a 2-point solution
 * where you have a left and right poitner and you just work in from the outside
 * 
 * @param {number[]} height
 * @return {number}
 */
function maxArea_ok(height) {
    let max = 0;

    const used = new Map();
    for (let i = 0; i < height.length; i++) {
        l = 0, r = height.length - 1;
        // don't check if we've used this height before
        if (used.get(height[i])) {
            continue;
        }
        used.set(height[i], true);
        // shhorten the length of the line until
        // you intersect with 2 vertical lines
        // i.e. search from the outside in
        while (height[l] < height[i]) {
            l++;
        }
        while (height[r] < height[i]) {
            r--;
        }
        const area = height[i] * (r - l);
        max = Math.max(max, area);
    }

    return max;
}

/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    let l = 0, r = height.length - 1, max = 0;
    while (l < r) {
        const shorter = Math.min(height[l], height[r]);
        const area = shorter * (r - l);
        max = Math.max(max, area);
        if (height[l] > height[r]) {
            r--;
        } else {
            l++;
        }
    }
    return max;
}


console.log(maxArea([1,8,6,2,5,4,8,3,7]));
console.log(maxArea([1,2]));
// console.log(maxArea_bad([1,8,6,2,5,4,8,3,7]));
// console.log(maxArea([1,1]));

/**
 * 2.6 years later... 
 * I did this super quick and it beats ~80% in performance. 
 * I recall thinking about this for a long time so maybe
 * I remember it in the back of my mind... Still good. 
 */
var maxArea = function(arr) {
    let max = 0, l = 0, r = arr.length - 1;
    while (l < r) {
        const h = Math.min(arr[l], arr[r]);
        const area = (r - l) * h;
        max = Math.max(max, area);
        if (arr[l] > arr[r]) { r--; }
        else l++
    }
    return max;
}