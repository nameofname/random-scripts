"use strict";
function formatter(o, s = '', parent = '') {
    for (const [k, v] of Object.entries(o)) {
        const subParent = `${parent}${parent ? ' > ' : ''}${k}`;
        if (typeof v !== 'object') {
            s += `${subParent} : ${v}`;
        }
        else {
            return formatter(v, s, subParent);
        }
    }
    return s;
}
const r1 = formatter({ a: 'adsf', b: 'asdf', c: { rondo: 'adsfadsf', danielle: 'DANIELLE' } });
const r2 = formatter({ a: 'adsf', b: 'asdf', c: ['rondo', 'DANIELLE'] });
console.log(r1);
console.log(r2);
//# sourceMappingURL=formatter.js.map