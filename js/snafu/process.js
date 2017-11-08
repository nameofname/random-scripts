"use strict";

const fs = require('fs');
// let listingsJson = JSON.parse(fs.readFileSync('./listings.json', {encoding: 'utf-8'}));
// listingsJson.sort((a, b) => {
//     return a.order > b.order ? 1 : -1;
// })
// let allValidListings = listingsJson.map(o => o.id)

let allValidListings = fs.readFileSync('./listingsBadOrder.txt', {encoding: 'utf-8'}).split('\n');

// console.log(allValidListings);
// process.exit()

const f1 = fs.readFileSync('./prune.txt', {encoding: 'utf-8'});
const arr1 = f1.split('--');
const f2 = fs.readFileSync('./prune1.txt', {encoding: 'utf-8'});
const arr2 = f2.split('--');

const processArr = a => a.map(str => {
    let s = str.replace('\nSort update successful: ', '');
    s = s.replace('\n', ' ');
    s = s.replace('\n\t', ' ');
    s = s.replace('\n\t', ' ');
    s = s.replace('\n', ' ');
    s = s.replace('\n\t', ' ');
    s = s.replace('\n', '');
    s = s.replace('Surround Listings', 'SurroundListings');
    let i = 0;
    let curr;

    // return s;

    const o = s.split(' ')
        .reduce((o, s) => {
            const key = s.replace(':', '');
            if (s.includes(':')) {
                o[key] = [];
                curr = key;
            } else {
                if (o[curr]) {
                    o[curr].push(s)
                } else {
                    // console.log('nothing for ', curr, s)
                }
            }
            return o;
        }, {});
    return o;
});

let allMoves = processArr([...arr1, ...arr2])
    .filter(obj => {
        return allValidListings.includes(`${obj.Listings[0]}`)
    })
    .map(obj => Object.assign(obj, {
        listingId : obj.Listings[0],
        positionNum : Number(obj.position[0])
    }))

// console.log(allMoves[0])
console.log(allValidListings.length)

allMoves.forEach(move => {
    const { positionNum: position, listingId } = move;
    allValidListings = allValidListings
        .filter(s => {
            return s !== move.listingId;
        });
    // console.log(`replacing this at that`, position-1, listingId, allValidListings.length)
    allValidListings.splice(position-1, 0, listingId)
});

console.log(allValidListings.length)
// console.log(JSON.stringify(allValidListings))
