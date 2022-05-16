const client = require('prom-client')
const { histogram } = require('./metric-types/histogram')
const { gauge } = require('./metric-types//gauge');
const { summary } = require('./metric-types//summary');
const { counter } = require('./metric-types//counter');
const { defaultMetrics } = require('./metric-types/defaultMetrics')
const express = require('express')
const app = express()
const register = new client.Registry();

// defaultMetrics(register, 'test-app')



// const httpRequestDurationSeconds = histogram(register, 'http_request_duration_seconds');

// register.registerMetric(httpRequestDurationSeconds);

client.collectDefaultMetrics({
    app: 'node-application-monitoring-app',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
    register
  });
  
  // Create a histogram metric
  const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
  });
  
  // Register the histogram
  register.registerMetric(httpRequestDurationMicroseconds);
  
const logHttpRequest = async (req, res) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;

    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
    end({ route, code: res.statusCode, method: req.method})

}

// app.get('/metrics', async (req, res) => {
//     res.setHeader('Content-Type', register.contentType);
//     res.send(await register.metrics());
//     await metrics.logHttpRequest(res, req)
// })

// gauge(register)

// summary(register)

// counter(register)

module.exports = { logHttpRequest }