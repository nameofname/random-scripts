// https://www.careercup.com/question?id=5670248861138944

function closedCompartments(s, startI, endI) {
    function _compute(s, start, end) {
        const sub = s.slice(start - 1, end);
        let open = false;
        let currCount = 0;
        let count = 0;
        for (l of sub) {
            if (l === '|') {
                open = !open;
                if (!open) {
                    count += currCount;
                    currCount = 0;
                    open = true;
                }
            }
            else if (l === '*') {
                if (open) ++currCount;
            }
        }
        return count;
    }
    return [
        _compute(s, startI[0], endI[0]),
        _compute(s, startI[1], endI[1])
    ]
}

console.log(closedCompartments('|**|*|*', [1, 1], [5, 6]));