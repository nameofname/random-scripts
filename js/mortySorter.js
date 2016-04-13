// This data is from the table found here : https://pocketmortys.net/mortys
// I run through the table and grab all the data I want, and get back some JSON :

var trs = document.getElementsByTagName('tr');
var arr = [];

for (var i=1; i < trs.length; i++) {
    var tds = trs[i].childNodes;
    var tdArr = [];

    for (var j = 0; j < tds.length; j++) {
        var td = tds[j];
        if (td.tagName === 'TD') {
            tdArr.push(tds[j]);
        }
    }

    arr.push({
        name : tdArr[1].innerText,
        baseXp : parseInt(tdArr[3].innerText),
        baseHp : parseInt(tdArr[4].innerText),
        statTotal : parseInt(tdArr[8].innerText),
        combinedScore : parseInt(tdArr[4].innerText) + parseInt(tdArr[8].innerText)
    });
}

console.log(JSON.stringify(arr));

console.log('Now identify the strongest mortys by totaling the stats total with the base HP : ');

var sorted = arr.sort(function (val1, val2) {
    return val1.combinedScore > val2.combinedScore;
});

var sorted = arr.sort(function (a, b) {
    return a.combinedScore > b.combinedScore ? 1 : 0;
})
console.log(JSON.stringify(sorted));

