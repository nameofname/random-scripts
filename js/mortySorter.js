// This data is from the table found here : https://pocketmortys.net/mortys
// I run through the table and grab all the data I want, and get back some JSON :

var trs = document.getElementsByTagName('tr');
var arr = [];

for (var i=1; i < trs.length; i++) {
//for (var i=1; i < 3; i++) {
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
        type : tdArr[2].children[0] ? tdArr[2].children[0].getAttribute('alt') : 'normal',
        baseXp : parseInt(tdArr[3].innerText),
        baseHp : parseInt(tdArr[4].innerText),
        baseAtk : parseInt(tdArr[5].innerText),
        baseDef : parseInt(tdArr[6].innerText),
        baseSpd : parseInt(tdArr[7].innerText),
        statTotal : parseInt(tdArr[8].innerText),
        rare : tdArr[9].innerText,
        badgesReq: parseInt(tdArr[10].innerText),
        combinedScore : parseInt(tdArr[4].innerText) + parseInt(tdArr[8].innerText)
    });
}

var sorted = arr.sort(function (val1, val2) {
    if (val1.combinedScore > val2.combinedScore) {
        return 1;
    } else if (val1.combinedScore < val2.combinedScore) {
        return -1;
    }
    return 0;
});

console.log(JSON.stringify(sorted));
