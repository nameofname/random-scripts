"use strict";

const data = require('./pokemon/pokemonGoData.json');
const bubbleSortImproved = require('./bubbleSortImproved');

console.log(
    bubbleSortImproved(data, o => o['Max CP'])
        .map(o => ({max : o['Max CP'], name : o.Name}))
);
