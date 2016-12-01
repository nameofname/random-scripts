"use strict";

const data = require('./pokemonGoData');

// const sorted = data.sort((a, b) => {
//     const {BaseDefense : d1, BaseStamina : s1, BaseAttack : a1} = a;
//     const {BaseDefense : d2, BaseStamina : s2, BaseAttack : a2} = b;
//     const aa = d1 + s1 + a1;
//     const bb = d2 + s2 + a2;
//     // console.log(`comparing : ${aa}, ${bb}`)
//     if (aa < bb) return -1;
//     if (aa > bb) return 1;
//     if (aa > bb) return 0;
// });
//

data.forEach((o, idx) => {
    const {BaseDefense : d1, BaseStamina : s1, BaseAttack : a1} = o;
    o.Total = d1 + s1 + a1;
    o.Rank = (150 - idx) + 1;
})

console.log(JSON.stringify(data))

