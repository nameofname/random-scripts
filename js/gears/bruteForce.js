"use strict";

const calcFinalValue = require('./calcFinalValue');


const isBetter = (bestAttempt, attempt) => {
    return Math.abs(attempt - 127) < Math.abs(bestAttempt - 127);
};


const findFour = (lowerBound, upperBound) => {
    let closest;
    let answer;

    for(let i = lowerBound; i <= upperBound; i++) {
        for(let j = lowerBound; j <= upperBound; j++) {
            for(let k = lowerBound; k <= upperBound; k++) {
                for(let l = lowerBound; l <= upperBound; l++) {
                    const num = calcFinalValue(i, j, k, l);
                    if (closest === undefined) {
                        closest = num;
                    } else {
                        if (isBetter(closest, num)) {
                            closest =  num;
                            answer = [i, j, k, l];
                        }
                    }
                }
            }
        }
    }

    return answer;
};

const findSix = (lowerBound, upperBound) => {
    let closest;
    let answer;

    for(let i = lowerBound; i <= upperBound; i++) {
        for(let j = lowerBound; j <= upperBound; j++) {
            for(let k = lowerBound; k <= upperBound; k++) {
                for(let l = lowerBound; l <= upperBound; l++) {
                    for(let m = lowerBound; m <= upperBound; m++) {
                        for(let n = lowerBound; n <= upperBound; n++) {
                            const num = calcFinalValue(i, j, k, l, m, n);
                            if (closest === undefined) {
                                closest = num;
                            } else {
                                if (isBetter(closest, num)) {
                                    closest =  num;
                                    answer = [i, j, k, l, m, n];
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return answer;
};


module.exports = {
    findFour,
    findSix
};