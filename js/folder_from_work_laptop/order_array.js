var array = [1,1,4,3,2,3,6,6,3,4,99,0,8,7,2,2,1];


function Order_array(){
    this.lib = [];
    this.out = [];
    this.get = function(arr) {
        var self = this;
        // create the library, adding all numbers to each. This is to accumulate all numbers, even duplicates.
        for (var i=0; i<arr.length; i++) {
            if (!self.lib[arr[i]]) {
                self.lib[arr[i]] = [];
            }
            self.lib[arr[i]].push(arr[i]);
        }
        // now loop over the library, putting each library number into the output array. 
        // They are already in order because this.lib is an array. 
        // hey Ron, this is yourself from years later - no they are not in order, this solution does not work. 
        for (var j=0; j<self.lib.length; j++) {
            // have to check that self.lib[j] is an array, or this will break. 
            if (typeof self.lib[j] === 'object') {
                for (var h=0; h<self.lib[j].length; h++) {
                    self.out.push(self.lib[j][h]);
                }
            }
        }
        return self.out;
    };
    console.log(this.out);
    return this;
}
var o = new Order_array();
o.get(array);


