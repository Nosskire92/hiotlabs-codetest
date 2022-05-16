const gauge = (register) => {
    const g = new promClient.Gauge({
        name: 'node_my_gauge',
        help: 'This is my gauge',
        labelNames: ['code'],
        buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
    })};
module.exports= { gauge }