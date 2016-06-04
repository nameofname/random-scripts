"use strict";


const lib = {
    men : [
        {
            name : 'rob',
            fiancee : undefined,
            ranks : {
                danielle : 1,
                samantha : 2,
                joan : 3
            }
        },
        {
            name : 'tom',
            fiancee : undefined,
            ranks : {
                danielle : 2,
                samantha : 3,
                joan : 1
            }
        },
        {
            name : 'ronald',
            fiancee : undefined,
            ranks : {
                danielle : 3,
                samantha : 2,
                joan : 1
            }
        }
    ],
    women : [
        {
            name : 'danielle',
            fiancee : undefined,
            ranks : {
                rob : 1,
                tom : 2,
                ronald : 3
            }
        },
        {
            name : 'joan',
            fiancee : undefined,
            ranks : {
                rob : 2,
                tom : 3,
                ronald : 1
            }
        },
        {
            name : 'samantha',
            fiancee : undefined,
            ranks : {
                rob : 3,
                tom : 2,
                ronald : 1
            }
        }
    ]
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
const len = lib.men.length;


// for each round...
for (let round=0; round<len; round++) {
    // for each man, he proposes to his top choice corresponding to that round.
    // IF he already has a fiancee, he does not propose (because he would be proposing to a someone below his current choice.
    for (var i in lib.men) {
        man = lib.men[i];
        woman = lib.women[round];
        if (!man.fiancee) {
            propose(man, woman);
        }
    }
}


console.log(lib.men.map(m => m.fiancee));
console.log(lib.women.map(w => w.fiancee));
