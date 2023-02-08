function formatter(o: Record<string, unknown>, s: string = '', parent: string = ''): string {
    for (const [k, v] of Object.entries(o)) {
        const subParent = `${parent}${parent ? ' > ' : ''}${k}`;
        if (typeof v !== 'object') {
            s += `${subParent} : ${v}`;
        } else {
            return formatter(v as Record<string, unknown>, s, subParent);
        }
    }
    return s;
}

const r1 = formatter({a: 'adsf', b: 'asdf', c: { rondo: 'adsfadsf', danielle: 'DANIELLE'}});
const r2 = formatter({a: 'adsf', b: 'asdf', c: [ 'rondo', 'DANIELLE']});

console.log(r1)
console.log(r2)