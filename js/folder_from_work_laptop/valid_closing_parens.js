module.exports = function (str) {
    var openingParens = ['(','[','{'];
    var closingParens = [')',']','}'];
    var openParens = [];
    str = str.split('');
    var curr;
    var parensMap = {
        ')' : '(',
        ']' : '[',
        '}' : '{'
    };
    var valid = true;

    loop : 
    for (var i=0; i < str.length; i++) {
        curr = str[i];
        if (openingParens.indexOf(curr) !== -1) {
            openParens.push(curr);
        }
        if (closingParens.indexOf(curr) !== -1) {
            if (openParens[openParens.length-1] !== parensMap[curr]) {
                valid = false; 
                break loop; 
            } else {
                openParens.pop();
            }
        }
    }

    if (openParens.length) {
        valid = false; 
    }

    return valid;
}
