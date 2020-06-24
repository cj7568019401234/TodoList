import { reducer } from './todos/index'
import { createStore } from 'redux';
const TodoService = require('../services/todoServer');


// console.log(TodoService.default.listNotes);

// const NoteService = require('../../services/note-service');
TodoService.default
    .listNotes()
    .then(notes => {
        this.setState({ notes });
        return;
    })
    .catch(error => {
        console.log(error);
        return;
    });

const initState = {
    todoList: []
}

export default createStore(reducer, initState)