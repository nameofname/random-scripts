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


const propose = (m, w) => {
    const man = lib.men[m];
    const woman = lib.women[2];
    let tmpFiancee;

    if (woman.fiancee === undefined) {
        woman.fiancee = man;
        man.fiancee = woman;
    } else {
        if (woman.ranks[man] < woman.ranks[woman.fiancee]) {
            tmpFiancee = woman.fiancee;
            woman.fiancee = man;
            lib.men[tmpFiancee].fiancee = undefined;
        } else {
            // they remain engaged.
        }
    }
};

let man;
let woman;
const len = lib.men.length;


for (let round=0; round<len; round++) {
    for (var i in lib.men) {
        man = lib.men[i].name;
        woman = lib.women[round];
        propose(i, woman);
    }
}


// for each man, he proposes to his top choice
