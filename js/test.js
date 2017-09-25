"use strict";

const pokemonData = require('./pokemon/pokemonGoData.json');
const bubbleSortImproved = require('./bubbleSortImproved');
const anagrams = require('./anagrams');
const indexOf = require('./indexOf');

const testAnagrams = ['deal', 'lead', 'eh', 'he', 'aled', 'a', 'not'];

console.log(

    // bubbleSortImproved(pokemonData, o => o['Max CP'])
    //     .map(o => ({max : o['Max CP'], name : o.Name}))

    // 'anagrams', anagrams(testAnagrams),

    'indexOf', 'Ronald'.indexOf('al')

);
