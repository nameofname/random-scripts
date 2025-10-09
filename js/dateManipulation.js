const d = new Date();

const month = 9; // October, months are 0 indexed confusingly 
d.setMonth(month);
d.setDate(1); // days are not 0 indexed... Argh!

let date = d.getDate();
console.log('the current month and day is', month, date);

// get all the days for the month of October :
const days = [];
while (d.getMonth() === 9) {
    days.push(date);
    d.setDate(++date)
    console.log(d.toString())
}

console.log('Here are all the days in October: ', days);

    #CDD0E5