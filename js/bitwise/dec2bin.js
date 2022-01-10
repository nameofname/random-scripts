// shows the binary representaiton of a number as a string
module.exports = function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}
