const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo_controller')


router.get("/", (req, res) => {
    res.json(todoController.todoLists)
})

router.post("/create",CreateLogger, todoController.createTodolist) // Create new todo list

router.post("/:todoid/create", CreateLogger, todoController.createNote) //Create item in a todo list

router
    .route("/:todoid")
    .get(listLogger, todoController.getTodolist)
    .delete(listLogger, todoController.deleteTodolist)

router
    .route("/:todoid/notes/:noteid")
    .get(noteLogger, todoController.getNote)
    .put(noteLogger, todoController.updateNote)
    .delete(noteLogger, todoController.deleteNote)

router.param("todoid", (req, res, next, todoid) => {
    req.todoid = todoid - 1 //Just to make url todo/1/ go to the first index in the list
    next()
})

router.param("noteid", (req, res, next, noteid) => {
    req.noteid = noteid - 1 //same as above but for notes 
    next()
})

function listLogger(req, res, next){ //Logging format for todo list interactions
    if (!todoController.todoLists[req.todoid]){
        console.log(`Cannot find item with id: ${req.todoid}`)
    } else {
    console.log(`${new Date().toISOString()}: Path: ${req.originalUrl}, Method: ${req.method}, Message: ${ JSON.stringify(todoController.todoLists[req.todoid]) }`)
    }
    next()
}
function noteLogger(req, res, next){ //Logging format for notes interaction
    if (!todoController.todoLists[req.todoid] || !todoController.todoLists[req.todoid]['notes'][req.noteid]){
        console.log(`Cannot find item with id: ${req.todoid}`)
    }
    else {
        console.log(`${new Date().toISOString()}: Path: ${req.originalUrl}, Method: ${req.method}, Message: ${ JSON.stringify(todoController.todoLists[req.todoid]['notes'][req.noteid]) }`)
    }
    next()

}
function CreateLogger(req, res, next){ //Logging format for notes interaction
    console.log(`${new Date().toISOString()}: Path: ${req.originalUrl}, Method: ${req.method}, Message: (note: ${ JSON.stringify(req.body.text)})`)
    next()

}
module.exports = router