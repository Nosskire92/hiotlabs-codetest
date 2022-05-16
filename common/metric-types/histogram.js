const promClient = require('prom-client');

const histogram = (register, appName) => {
    const h = new promClient.Histogram({
        name: appName,
        help: 'This is my sample histogram',
        labelNames: ['method', 'route' ,'code'],
        buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
    })};
module.exports = { histogram }