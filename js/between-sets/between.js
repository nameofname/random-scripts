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

const findFactors = int => {
    let factors = [];
    for (let i = 2; i <= int / 2; i++) {
        if (int % i === 0) {
            factors.push(i, int / i);
        }
    }
    return factors.length ? factors : false;
};

const findAllFactors = int => {
    let factors = findFactors(int);
    let currLen = factors.length;
    let growing = true;

    while (growing) {
        console.log('growing', growing, factors)
        const newFactors = factors
            .map(findFactors)
            .reduce((ar, cur) => {
                return Array.isArray(cur) ? [...ar, ...cur] : [...ar, cur];
            }, [])
            .filter(Boolean);

        factors = [...factors, ...newFactors]
            .sort()
            .reduce((arr, curr) => {
                return arr.includes(curr) ? arr : [...arr, curr];
            }, []);

        growing = (factors.length > currLen);
        currLen = factors.length;
    }
};


function getTotalX(a, b) {
    return console.log('find factors of...', b[0], findAllFactors(b[0]));
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
