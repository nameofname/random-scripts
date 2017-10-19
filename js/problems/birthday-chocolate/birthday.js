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

function solve(arr, sum, n) {
    const end = arr.length - n;
    let count = 0;

    for (let i = 0; i <= end; i++) {
        let currSum = 0;
        for (let j = 0; j < n; j++) {
            currSum += arr[i + j];
        }
        // console.log('curr sum', currSum, n)
        if (currSum === sum) {
            count++;
        }
    }

    return count;
}

function main() {
    var n = parseInt(readLine());
    s = readLine().split(' ');
    s = s.map(Number);
    var d_temp = readLine().split(' ');
    var d = parseInt(d_temp[0]);
    var m = parseInt(d_temp[1]);
    var result = solve(s, d, m);
    process.stdout.write(""+result+"\n");

}
