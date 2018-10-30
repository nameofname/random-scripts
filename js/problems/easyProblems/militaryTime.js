function militaryTime(str) {
    str = str.toLowerCase();
    let amPm = str.slice(-2);
    if (amPm === 'am') {
        amPm = 'am';
    } else if (amPm === 'pm') {
        amPm = 'pm';
    }

    const arr = str.split(amPm)[0].split(':');

    if (arr.length !== 3 || amPm === undefined) {
        throw new Error('improperly formatted time string, missing AM PM');
    }

    arr[0] = parseInt(arr[0]);
    arr[0] = arr[0] === 12 ? 0 : arr[0];
    if (amPm === 'pm') {
        arr[0] = arr[0] + 12;
    }
    arr[0] = new String(arr[0]);
    arr[0] = arr[0].length === 1 ? `0${arr[0]}` : arr[0];

    return arr.join(':');
}

console.log(militaryTime('07:05:45PM'))
console.log(militaryTime('07:05:45AM'))
// console.log(militaryTime('11:05:45PM'))
// console.log(militaryTime('12:05:45PM'))
// console.log(militaryTime('12:05:45AM'))
console.log(militaryTime('12:00:00AM'))
console.log(militaryTime('12:00:00PM'))
