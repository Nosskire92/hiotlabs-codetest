const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.json())
/app.use(express.urlencoded({extended: false}))
app.listen(3000, () => {
    console.log(`App listening on port 3000`)
})

const todoRouter = require('./routes/todo')

app.use('/todo', todoRouter)