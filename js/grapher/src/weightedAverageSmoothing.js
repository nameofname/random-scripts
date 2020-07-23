"use strict";

const logger = require('pint-sized-logger');

function weightedAverageSmooth(data, width) {
    if (width % 2 !== 0) {
        throw new Error('You must pass an even width to weightedAverageSmoothing');
    }
    const halfWidth = width / 2;
    const newData = data.map((point, idx) => {
        const left = (idx - halfWidth) < 0 ? 0 : idx - halfWidth; // can't have a negative entry in array
        const right = idx + halfWidth;

        let weightTotal = 0;
        let yValueTotal = 0;

        for (let i = left; i <= right; i++) {
            const relatedPoint = data[i];
            if (relatedPoint) {
                const weight = halfWidth - Math.abs(idx - i) + 1;
                weightTotal += weight;
                yValueTotal += relatedPoint[1] * weight;
            }
        }

        const weightedAverage = (yValueTotal / weightTotal);
        return [point[0], weightedAverage];
    });

    return newData;
}

function weightedAverageSmoothing(data, width, passes) {
    if (passes > 100) {
        logger.warn('Warning! Applying ${passes} passes via weightedAverageSmoothing... this may take a while');
    }
    let newData;
    for (let i = 0; i <= passes; i++) {
        newData = weightedAverageSmooth(data, width);
    }
    return newData;
}

module.exports = weightedAverageSmoothing;