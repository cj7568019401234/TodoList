import { reducer } from './todos/index'
import { createStore } from 'redux';
const TodoService = require('../server/services/TodoManager');


// const NoteService = require('../../services/note-service');


TodoService
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