'use strict';

const fs = require('fs').promises;
const path = require('path');
const csvtojson = require('csvtojson');
const { Parser } = require('json2csv');

async function loadFile(filePath) {
    try {
        return await fs.readFile(filePath, { encoding: 'utf-8' });
    } catch (err) {
        console.log('Failed to load file', filePath);
        return undefined;
    }
}

function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

async function loadJsonFromCsvFile(filePath) {
    const delimiter = ',';
    const contents = await loadFile(filePath);
    return await csvtojson({ delimiter }).fromString(contents);
}

async function writeCsvFile(csvList, filePath) {
    // Enforce the order of fields by editing the CSV list first value
    const fieldOrder = ['keyword', 'totalResults', 'primary_url'];
    const fields = Object.keys(csvList[0]).sort((a, b) => {
        a = fieldOrder.includes(a) ? fieldOrder.indexOf(a) : 500;
        b = fieldOrder.includes(b) ? fieldOrder.indexOf(b) : 500;
        return a - b;
    });
    csvList[0] = fields.reduce((o, field) => {
        return { ...o, [field]: csvList[0][field] };
    }, {});

    const parser = new Parser();
    const csv = parser.parse(csvList);
    await fs.writeFile(path.resolve(__dirname, '..', filePath), csv);
}

async function combineCsvFiles({ rootDir, destination }) {
    const list = await fs.readdir(rootDir);
    let allJson = [];

    for (let i = 0; i < list.length; i++) {
        const fullPath = path.resolve(rootDir, list[i]);
        if (fullPath.split('.').pop() === 'csv') {
            const json = await loadJsonFromCsvFile(fullPath);
            allJson = allJson.concat(filterBuyPages(json));
        }
    }

    const parser = new Parser();
    const csv = parser.parse(allJson);
    await fs.writeFile(destination, csv);
}

module.exports = {
    // file manipulation
    writeCsvFile,
    loadJsonFromCsvFile,
    combineCsvFiles,
};
