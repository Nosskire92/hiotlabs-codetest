const promClient = require('prom-client');
const counter = (register) => {
    const c = new promClient.Counter({
        name: 'node_my_counter',
        help: 'This is my counter',
        labelNames: ['code'],
    })};

module.exports = { counter }