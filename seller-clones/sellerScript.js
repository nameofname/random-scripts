const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');
const { Parser } = require('json2csv');

async function writeCsvFile(csvList, filePath) {
    const parser = new Parser();
    const csv = parser.parse(csvList);  
    await fs.writeFile(path.resolve(__dirname, './data', filePath), csv, () => {});
}

const contents = fs.readFileSync(path.resolve(__dirname, 'seller-clones-matching-title-1.csv'), { encoding: 'utf-8'})

async function process() {
    return csvtojson({ delimiter: ',' }).fromString(contents).then(async function(json) {
        const badBoys = json
            .filter(row => {
                let { available_inventory_is_clone_of_available_item_same_title, percent } = row;
                available_inventory_is_clone_of_available_item_same_title = parseInt(available_inventory_is_clone_of_available_item_same_title);
                percent = parseInt(percent);
                return available_inventory_is_clone_of_available_item_same_title > 10
                && percent > 10;
            })
            .sort((a, b) => {
                const s = 'available_inventory_is_clone_of_available_item_same_title';
                return b[s] - a[s];
            });
        console.log(badBoys)
        console.log(`Found ${badBoys.length} offenders out of ${contents.length}`)
        await writeCsvFile(badBoys, 'ass-hats.csv')
    });
}

process().then(() => console.log('done'));
