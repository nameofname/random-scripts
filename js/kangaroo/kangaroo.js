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

function kangaroo(x1, v1, x2, v2) {
    const staratingDistance = Math.abs(x1 - x2);
    let distance = staratingDistance;
    while (distance <= staratingDistance) {
        x1 += v1;
        x2 += v2;
        if (x1 === x2) {
            return true;
        }
        distance = Math.abs(x1 - x2);
    }
    return false;
}

function main() {
    var x1_temp = readLine().split(' ');
    var x1 = parseInt(x1_temp[0]);
    var v1 = parseInt(x1_temp[1]);
    var x2 = parseInt(x1_temp[2]);
    var v2 = parseInt(x1_temp[3]);
    var result = kangaroo(x1, v1, x2, v2) ? 'YES' : 'NO';
    process.stdout.write("" + result + "\n");
}
