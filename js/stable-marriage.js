"use strict";


const lib = {
    men : {
        rob: {
            name : 'rob',
            fiancee: undefined,
            ranks : ['danielle', 'samantha', 'joan']
        },
        tom: {
            name: 'tom',
            fiancee: undefined,
            ranks : ['joan', 'danielle', 'samantha']
        },
        ronald: {
            name: 'ronald',
            fiancee: undefined,
            ranks : ['joan', 'samantha', 'danielle']
        }
    },
    women : {
        danielle: {
            name: 'danielle',
            fiancee: undefined,
            ranks : ['rob', 'tom', 'ronald']
        },
        joan: {
            name: 'joan',
            fiancee: undefined,
            ranks : ['ronald', 'rob', 'tom']
        },
        samantha: {
            name: 'samantha',
            fiancee: undefined,
            ranks : ['ronald', 'tom', 'rob']
        }
    }
};


const propose = (man, woman) => {
    let tmpFiancee;

    if (woman.fiancee === undefined) {
        woman.fiancee = man.name;
        man.fiancee = woman.name;
    } else {
        if (woman.ranks[man] < woman.ranks[woman.fiancee]) {
            tmpFiancee = woman.fiancee;
            woman.fiancee = man.name;
            lib.men[tmpFiancee].fiancee = undefined;
        } else {
            // they remain engaged.
        }
    }
};

let man;
let woman;
let womanName;
const len = lib.men.ronald.ranks.length;


// for each round...
for (let round=0; round<len; round++) {
    // for each man, he proposes to his top choice corresponding to that round.
    // IF he already has a fiancee, he does not propose (because he would be proposing to a someone below his current choice.
    for (var i in lib.men) {
        man = lib.men[i];
        womanName = lib.men[i].ranks[round];
        woman = lib.women[womanName];

        if (!man.fiancee) {
            propose(man, woman);
        }
    }
}



console.log(Object.keys(lib.men).map(m => lib.men[m].fiancee));
console.log(Object.keys(lib.women).map(w => lib.women[w].fiancee));
