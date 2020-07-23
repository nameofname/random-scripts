"use strict";

const buildGraph = require('./src/index');
const { loadJsonFromCsvFile } = require('./src/csvUtils');

async function init() {
    const data = await loadJsonFromCsvFile(__dirname + '/data/Metro_median_sale_price_uc_SFRCondo_sm_sa_week.csv');

    function transform(data) {
        return Object.keys(data[3])
            .map(key => {
                return [Date.parse(key), parseInt(data[3][key])];
            })
            .filter(([ a ]) => !!a);
    }
    buildGraph({
        data,
        transform,
        // smoothing: { width: 100, passes: 10 },
        open: true,
    });
}

init();