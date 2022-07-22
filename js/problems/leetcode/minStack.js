// https://leetcode.com/problems/min-stack/

class MinStack {
    
    a = [];

    push(val) {
        const lastVal = this.a.slice(-1)[0];
        const oldMin = lastVal?.[1];
        let newMin = oldMin
        if (oldMin === undefined || val < oldMin) { 
            newMin = val;
        }
        this.a.push([val, newMin]);
    }
    pop() {
        this.a.pop();
    }
    top() {
        const tup = this.a.slice(-1)[0];
        return tup?.[0];
    }
    getMin() {
        const tup = this.a.slice(-1)[0];
        return tup?.[1];
    }
}


function test() {
    const m = new MinStack();
    const instructions = ["push","push","push","getMin","pop","top","getMin"];
    const args = [[-2],[0],[-3],[],[],[],[]];
    instructions.forEach((ins, idx) => {
        const r = m[ins].apply(m, args[idx]);
        console.log(r)
    });
}

test();