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
    console.log('OLD loops', loops);
    return max;
};

/**
 * This one seems smarter but actually has worse time complexity
 * The idea is instead of moving the right post right, and then moving the left back to 1
 * ... you're choosing each line as the new middle and searching outwards
 * But if you think about it, this approach discovers just as many combos as the last
 * ... and it's actually double counting a few... which I could fix, but it's not worth it. 
 * @param {*} height 
 * @returns 
 */
function maxArea(height) {
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
            console.log('checking', height[l], height[r], h, area);
            if (area > max) {
                console.log('got it', l, r, h, area);
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
    console.log('NEW loops', loops);
    return max;
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
console.log(maxArea_bad([1,8,6,2,5,4,8,3,7]));
// console.log(maxArea([1,1]));
