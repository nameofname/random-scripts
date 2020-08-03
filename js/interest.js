"use strict";


/**
 * Playing around with calculating annualy accrued interest 
 */
function interest({ rate, principal, timePeriods }) {
    let elapsed = 0;
    let result = principal;

    while (++elapsed <= timePeriods) {
        result += result * rate
    }

    return result;
}

console.log('ronaldy results', 
    interest({ principal: 500000, rate: 0.03, timePeriods: 5})
)

module.exports = interest;
