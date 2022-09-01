const arrivals = [100, 105, 110, 120, 140, 150];
const departures = [100, 105, 110, 120, 140, 150];

function flightItin(departures, arrivals, budget) {
    const matches = [];
    let p = arrivals.length;
    for (let i = 0; i < departures.length; i++) {
        // this while loop will only ever execute m times (m = arrivals.length)
        while (p > 0 && (departures[i] + arrivals[p - 1] > budget)) p--;
        matches.push(...arrivals.slice(0, p).map(int => [departures[i], int]))
    }
    return matches;
}

function brute(departures, arrivals, budget) {
    const matches = [];
    for (let d of departures) {
        for (let a of arrivals) {
            if (d + a <= budget) matches.push([d, a]);
        }
    }
    return matches;
}

console.log(flightItin(arrivals, departures, 210));
console.log(brute(arrivals, departures, 210));