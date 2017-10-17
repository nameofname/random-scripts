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
    let factors = [int];
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

// any number N that is between A and B is a number where every integer in A is a factor of N, and N is a factor of
// every number in B
// A = [a1, a2, ... an] = factors of N
// B = [b1, b2, ... bn] = N is factor of all B
function getTotalX(a, b) {
    const factorsOfBMap = b
        // array of factors for each of the ints in B, yeilding a 2-dimensional array
        .map(findFactors)
        .reduce((obj, arr) => {
            arr.forEach(int => {
                obj[int] = obj[int] || 0;
                ++obj[int];
            });
            return obj;
        }, {});

    const factorsOfEveryB = Object.keys(factorsOfBMap)
        .filter(int => factorsOfBMap[int] === b.length)
        .map(Number);

    return factorsOfEveryB
        .filter(num1 => {
            return a.reduce((prev, num2) => {
                return !prev ? prev : num1 % num2 === 0;
            }, true);
        });
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
    return console.log(total.length);
    // process.stdout.write("" + total + "\n");

}
