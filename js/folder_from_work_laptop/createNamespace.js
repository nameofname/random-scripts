/* TEST: */


var str = 'obj.inner.inner1.inner2';

var createObject = function(str) {
    var arr = str.split('.');
    var obj = {};
    var tmpObj = false;
    for (var i=0; i<arr.length; i++) {
        if (tmpObj) {
            tmpObj[arr[i]] = {};
            tmpObj = tmpObj[arr[i]];
        } else {
            obj[arr[i]] = {};
            tmpObj = obj[arr[i]]
        }
    }
    return obj; 
}


/* Dale's method:*/
 api.createNamespace = function (ns, fn, args, instantiate) {
                       var nsArray = ns.split('.'),
                                 i = 0, nsLen = nsArray.length,
                                 root = window,
                                 target;

                       while (nsLen > 1) {
                               var newNs = nsArray.shift();
                               if (typeof root[newNs] === 'undefined') {
                                       root[newNs] = {};
                               }
                               root = root[newNs];
                               nsLen = nsArray.length;
                       }

                       target = nsArray.shift();

                       if (!root[target]) {
                               if (fn) {
                                       root[target] = typeof fn === 'function' && instantiate ? new fn(this, args) : fn;
                               } else {
                                       root[target] = {};
                               }
                       }

                       return root;
               };
