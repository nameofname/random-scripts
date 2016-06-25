"use strict";

/**
 * Gets the distance between 2 points. Each point is an array of [X, Y] coordinates.
 * @param point1
 * @param point2
 * @returns {number}
 */
const getDistance = (point1, point2) => {
    // NOTE* Uses a2 + b2 = c2; - hence the a,b variable names.
    const a = Math.abs(point1[0] - point2[0]);
    const b = Math.abs(point1[1] - point2[1]);
    return Math.sqrt((a * a) + (b * b));
};

module.exports = getDistance;