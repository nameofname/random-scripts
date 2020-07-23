module.exports = function convertStocksToXY(data) {
    const { "Time Series (Daily)" : series } = data;
    return Object.keys(series)
        .map(date => {
            const close = Number(series[date]["4. close"]);
            const dateTime = Date.parse(date);
            return [ dateTime, close ];
        })
        .sort((a, b) => a[0] - b[0]);
}