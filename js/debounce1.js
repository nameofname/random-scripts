module.exports = function debounce(callback, time) {
    function _executor(cb) {
        return function() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function() {
                return cb();
            }, time);
        }
    }
    return new _executor(callback);
}
