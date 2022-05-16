const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const metricServer = express()
const metrics = require('./common/metrics')

app.use(express.json())
/app.use(express.urlencoded({extended: false}))
app.listen(3000, () => {
    console.log(`App listening on port 3000`)
})
const todoRouter = require('./routes/todo')
app.use('/todo', todoRouter)
metricServer.get('/metrics', async (req, res) => {
    try{
        metrics.logHttpRequest(req, res)
    } catch(err) {
        res.status(500).end(err)
    }
})
metricServer.listen(8080, () => {
    console.log('metrics exposed at localhost:8080/metrics')
})
