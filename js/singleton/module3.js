// console.log('process starting...');
// setInterval(function() {
//     console.log('interval executing...');
//     // execute your requests here.
// }, 3000);

let t;

module.exports = function poll() {
    if (t) return;
    console.log('process starting...');
    t = setInterval(function() {
        console.log('interval executing...');
    }, 3000);
}
