"use strict";

const categories = require('./categories.json');
const { result } = categories;
const { Parser } = require('json2csv');

const results = [];
function indent(int) {
    return new Array(int).fill('    ').join('');
}

function itar(children, parents, level) {
    children.forEach(category => {
        const ll = 'L' + level
        const current = parents.concat(category.name);
        // console.log(indent(level), ll, current);
        results.push(current);
        if (Array.isArray(category.children)) {
             itar(category.children, current, level + 1);
        }
    });
}

itar(result, [], 1)

const output = results.map(result => {
    return Object.keys(result).reduce((obj, ll) => {
        return Object.assign(obj, { [`L${parseInt(ll) + 1}`]: result[ll] })
    }, {});
});

const parser = new Parser();
const csv = parser.parse(output);
console.log(csv)