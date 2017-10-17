process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

const whatTheLiteralFuckWasIThinking = int => {
    let factors = [];
    console.log('1nst look' , int)
    for (let i = 2; i <= int / 2; i++) {
        if (int % i === 0) {
            factors.push(i, int / i);
        }
    }
    if (!factors.length) {
        return false;
    }
    console.log('2nd look' , factors)
    return factors
        // find factors for each factor
        .map(findFactors)
        // flatten
        .reduce((arr, curr) => {
            return Array.isArray(curr) ? [...arr, ...curr] : [...arr, curr];
        }, [])
        // remove 'false' values
        .filter(Boolean)
        // sort to prep for de-duping
        .sort()
        // de-dupe
        .reduce((arr, curr) => {
            return arr.includes(curr) ? arr : [...arr, curr];
        }, []);
};

const findFactors = int => {
    let factors = [];
    for (let i = 2; i <= int / 2; i++) {
        if (int % i === 0) {
            factors.push(i, int / i);
        }
    }
    return factors
        .sort()
        .reduce((arr, curr) => {
            return arr.includes(curr) ? arr : [...arr, curr];
        }, []);
};


function getTotalX(a, b) {
    return console.log('find factors of...', b[0], findFactors(b[0]));
    const factorsOfB = b.map(findFactors); // array of factors for each of the ints in B, yeilding a 2-dimensional array
    return factorsOfB;
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);
    a = readLine().split(' ');
    a = a.map(Number);
    b = readLine().split(' ');
    b = b.map(Number);
    var total = getTotalX(a, b);
    process.stdout.write("" + total + "\n");

}
