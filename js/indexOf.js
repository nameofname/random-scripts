// This is the text editor interface. 
// Anything you type or change here will be seen by the other person in real time.

// == vs ===

// .bind()

// .indexOf
String.prototype.indexOf = function (subString) {

    const arr = this.split('');
    const substringArr = subString.split('');
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        if (arr[0] === substringArr[0]) {
            let valid = true;

            innerLoop:
            for (let j = 0; i < substringArr.length; j++) {
                if (arr[j] === substringArr[j]) {
                    valid = true;
                } else {
                    valid = false;
                    break innerLoop;
                }
            }
            if (valid) {
                return i;
            }

        } else {
            arr.shift();
        }
    }

    return undefined;
};
