"use strict"; 

const data = require("./pokemonData.json");
const log = require('./colorLog');

data.forEach((o, idx) => { o.rank = idx; });

const findByName = name => {
    return data.reduce((prev, o) => {
        if (prev) {
            return prev
        } else {
            return o.name.toLowerCase() === name.toLowerCase() ? o : null 
        }
    }, null);
};

const getTop = n => {
    const arr = [];
    for (let i=0; i<=n; i++) {
        arr.push(data[i]);
    }
    return arr;
};

const analyzer = {
    findByName : findByName,
    getTop : getTop
};

module.exports = analyzer;

// examples : 
log.green(JSON.stringify(analyzer.getTop(30)));
log.green(JSON.stringify(analyzer.findByName('Vileplume')));
