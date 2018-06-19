// this problem is based on the fact that Russia moved from the Julian 
// to the Georgian calendar in the year 1918
function solve(year) {
    let isLeap = false;
    if (year < 1918) {
        // Julian Calendar
        isLeap = year % 4 === 0;
    } else if (year > 1918) {
        // Georgian Calendar
        isLeap = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
    } else {
        // special case for the year 1918 when it switched over : 
        return '26.09.1918';
    }
    const feb = isLeap ? 29 : 28;
    const first8Months = 31 + feb + 31 + 30 + 31 + 30 + 31 + 31;
    const day = 256 - first8Months;
    return day + '.09.' + year;
}

console.log(solve(1918)); // 26.09.1918
