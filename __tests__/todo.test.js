const request = require('supertest')
const express = require('express')
const router = require('../routes/todo')
const todoController = require('../controllers/todo_controller')
const app = new express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)
describe('root route testing', () => {

    test('responds to /', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toBe(200)
    })
})

describe('creation testing', () => {
    test('responds to /:todoid POST', async () => {
        const res = await request(app).post('/create').expect("Content-Type", /json/).send(
            {
                text: "test",
            }
        )
        expect(res.statusCode).toBe(201)
    })
    test('responds to /:todoid/notes/:noteid POST', async () => {
        const res = await request(app).post('/3/create').send({
            text: "new test note"
        })
        console.log(res.text)
        expect(res.statusCode).toBe(201)
    })
})
describe('/:todoid/notes/:noteid testing', () => {
    test('responds to /:todoid/notes/:noteid GET', async () => {
        const res = await request(app).get('/3/notes/1')
        console.log(res.text)
        expect(res.statusCode).toBe(200)
    })
    test('responds to /:todoid/notes/:noteid PUT', async () => {
        const res = await request(app).put('/3/notes/1').send({
            text: "updated text"
        })
        console.log(res.text)
        expect(res.statusCode).toBe(203)
    })
    test('responds to /:todoid/notes/:noteid DELETE', async () => {
        const res = await request(app).delete('/3/notes/1')
        console.log(res.text)
        expect(res.statusCode).toBe(200)
    })
})
describe('/:todoid testing', () => {
    test('responds to /:todoid GET', async () => {
        const res = await request(app).get('/3')
        expect(res.statusCode).toBe(200)
    })
    test('responds to /:todoid DELETE', async () => {
        const res = await request(app).delete('/3')
        expect(res.statusCode).toBe(200)
    })
})
describe('Error testing', () => {
    test('When id doesnt exist on /:todoid GET',async  () => {
        const res = await request(app).get('/4')
        expect(res.statusCode).toBe(404)
    })
    test('When id doesnt exist on /:todoid GET', async () => {
        const res = await request(app).delete('/4')
        expect(res.statusCode).toBe(404)
    })
})
