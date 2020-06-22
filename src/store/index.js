import { reducer } from './todos/index'
import { createStore } from 'redux';
const TodoDB = require('./todos/DataAccess');
const todoDB = new TodoDB();


const initState = {
    todoList: todoDB.findTodos(),
}

export default createStore(reducer, initState)