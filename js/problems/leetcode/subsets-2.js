function subsetsWithDup(nums) {
    const indicies = new Array(nums.length).fill('1').map((a, idx) => idx);
    function powerSet(arr, curr = [], sets = [], used = {}) {
        curr = curr.sort((a, b) => a - b);
        if (!used[curr.join('-')]) {
            const transformed = curr.map(idx => nums[idx]).sort();
            const tKey = 'transformed-' + transformed.join('-');
            if (!used[tKey]) {
                sets.push(transformed);
                used[tKey] = true
            }
            used[curr.join('-')] = true;
    
            for (let i = 0; i < arr.length; i++) {
                if (!curr.includes(arr[i])) {
                    powerSet(arr, [...curr, arr[i]], sets, used)
                }
            }
        }
        return sets;
    }
    return powerSet(indicies);
}

// console.log(powerSet(new Array(10).fill('1').map((a, idx) => idx)));
// console.log(JSON.stringify(subsetsWithDup([1, 2, 2])));
console.log(JSON.stringify(subsetsWithDup([4,4,4,1,4])));

