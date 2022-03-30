const todoLists = [{id: 1, notes: ["start the test assignment","Finish test assignment","Eat dinner"]},
{id: 2, notes: ["upload to git","email git link","prepare for thursday"]}]

const createTodolist =  (req, res) => {
    if (!req.body.text){
        return res.status(403).json({message: "Please add the text field to add an item to the list"})
    } else{
        console.log('test')
        noteData = {id: todoLists.length + 1, notes: [req.body.text],}
        todoLists.push(noteData)
        return res.status(201).json(noteData)
    }
}

const getTodolist = (req, res) => {
    if (!todoLists[req.todoid]){
        return res.status(404).json({message: "Could not find that list"})
    } else {
        return res.status(200).json(todoLists[req.todoid])
    }
}

const deleteTodolist =  (req, res) => {

    if(!todoLists[req.todoid]){
        return res.status(404).json({message: "Could not find item with this id"})
    } else {
        todoLists.splice(req.todoid, 1)
        return res.status(203).json({message: todoLists[req.todoid]})
    }
}

const createNote = (req, res) => {
        noteData = req.body.text
        todoLists[req.todoid]['notes'].push(noteData)
        return res.status(201).json({message: noteData})
}

const deleteNote =  (req, res) => {
    if(!todoLists[req.todoid] || !todoLists[req.todoid]['notes'][req.noteid]){
        return res.status(404).json({message: "Could not find item with this id"})
    } else {
        todoLists[req.todoid]['notes'].splice(req.noteid, 1)
        return res.status(203).json({message: todoLists[req.todoid]['notes'][req.noteid]})
    }

}

const updateNote = (req, res) => {
    if (!req.body.text){
        return res.status(403).json({message: "Please add text field to body"})
    } else {
        todoLists[req.todoid]['notes'][req.noteid] = req.body.text
        return res.status(203).json({message: todoLists[req.todoid]['notes'][req.noteid]})
    }
}

const getNote = (req, res) => {
    if (!todoLists[req.todoid]['notes'][req.noteid]){
        return res.status(404).json( {message: "Could not find that note"})
    } else {
        return res.status(200).json({message: todoLists[req.todoid]['notes'][req.noteid]})
    }
}

module.exports = {
    todoLists,
    getTodolist,
    getNote,
    deleteTodolist,
    deleteNote,
    createTodolist,
    createNote,
    updateNote,
}

