
function chess_board(){
    var x = [];
    for (var i=0; i<8; i++) {
        var y = [];
        x.push(y);
        for (var j=0; j<8; j++) {
            var val = (i + j) % 2;
            y.push(val);
        }
    }
    return x;
}

function checkerBoard (w, h) {
    var out = [];
    var currArr;
    var xo;

    for (var i = 0; i < h; i++) {
        out[i] = [];
        currArr = out[i];

        for (var j = 0; j < w; j++) {
            xo = ((j + i) % 2 === 0) ? 'x' : 'o';
            currArr.push(xo);
        }
        console.log(currArr.join('  '))
    }

    return out;
}
