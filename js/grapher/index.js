"use strict";

const graph = require('./graph');
const data = require('./data.json');
const convertStocksToXY = require('./convertStocksToXY');
const weightedAverageSmoothing = require('./weightedAverageSmoothing');



// function getDateRange(arr, lowerYear, upperYear) {
//     return arr.filter(point => {
//         const date = new Date(point[0]);
//         return lowerYear < date.getFullYear() && date.getFullYear() < upperYear;
//     });
// }



document.addEventListener("DOMContentLoaded", function(event) { 

    function transformer(data) {
        data = convertStocksToXY(data);
        return weightedAverageSmoothing(data, 100, 10);
    }

    graph({ data, transformer });
});
