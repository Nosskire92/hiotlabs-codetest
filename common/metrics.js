const client = require('prom-client')
const { histogram } = require('./metric-types/histogram')
const { gauge } = require('./metric-types//gauge');
const { summary } = require('./metric-types//summary');
const { counter } = require('./metric-types//counter');
const { defaultMetrics } = require('./metric-types/defaultMetrics')
const express = require('express')
const app = express();

const register = new client.Registry();

defaultMetrics(register, "todoapp")



const httpRequestDurationSeconds = new histogram(register, "todoapp");

register.registerMetric(httpRequestDurationSeconds);
const logHttpRequest = (req, res) => {
    const end = httpRequestDurationSeconds.startTimer();
    const route = req.route.path;

    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());

    end({ route, code: res.statusCode, method: req.method})

}

gauge(register)

summary(register)

counter(register)

module.exports = { logHttpRequest }