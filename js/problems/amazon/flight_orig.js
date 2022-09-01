
function findItin(departing, arriving, budget5) {
    const matches = [];

    const m = arriving.reduce((a, c) => {
        a.set(c, true);
        return a;
    }, new Map());

    for (let d of departing) {
        if (m.has(budget - d)) matches.push([d, bugdet - d]);
    }

    return matches;
}


/**
 * 
 *     for (let d of departing) {
        for (let a of arriving) {
            if (d + a > budget) continue;
            else if (d + a === budget) matches.push([d, a]);
        }
    }

 * 