"use strict";

const attributesJson = require('./attributes.json');
const { Parser } = require('json2csv');
const attributes = attributesJson.result.dataList;

const results = [];

function itar(children, parents, level) {
    children.forEach(attribute => {
        const current = parents.concat(attribute.name);
        results.push(current);
        const nextChildren = attribute.options || attribute.child;
        if (Array.isArray(nextChildren)) {
             itar(nextChildren, current, level + 1);
        }
    });
}

itar(attributes, [], 1)
// console.log(results);

const output = results.map(result => {
    return Object.keys(result).reduce((obj, ll) => {
        return Object.assign(obj, { [`Level ${parseInt(ll) + 1}`]: result[ll] })
    }, {});
});

const parser = new Parser();
const csv = parser.parse(output);
console.log(csv);