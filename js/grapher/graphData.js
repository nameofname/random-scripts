"use strict";

const data = require('./data.json');
const Highcharts = require('highcharts');
const convertStocksToXY = require('./convertStocksToXY');
const weightedAverageSmoothing = require('./weightedAverageSmoothing');

function graph(data) {
    Highcharts.chart('container', {
        chart: {
            zoomType: 'x',
        },
        title: {
            text: 'X over time',
        },
        subtitle: {
            text:
                document.ontouchstart === undefined
                    ? 'Click and drag in the plot area to zoom in'
                    : 'Pinch the chart to zoom in',
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Exchange rate',
            },
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [
                            1,
                            Highcharts.Color(Highcharts.getOptions().colors[0])
                                .setOpacity(0)
                                .get('rgba'),
                        ],
                    ],
                },
                marker: {
                    radius: 2,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                threshold: null,
            },
        },

        series: [
            {
                type: 'area',
                name: 'USD to EUR',
                data: data,
            },
        ],
    });
}

const dataArr = convertStocksToXY(data);

function getDateRange(arr, lowerYear, upperYear) {
    return arr.filter(point => {
        const date = new Date(point[0]);
        return lowerYear < date.getFullYear() && date.getFullYear() < upperYear;
    });
}


const smoothedLine = weightedAverageSmoothing(dataArr, 100, 10);

document.addEventListener("DOMContentLoaded", function(event) { 
    // graph(getDateRange(dataArr, 2008, 2014));
    graph(smoothedLine);
});
