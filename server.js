const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({extended: false}))
app.listen(3000)

const todoRouter = require('./routes/todo')

app.use('/todo', todoRouter)