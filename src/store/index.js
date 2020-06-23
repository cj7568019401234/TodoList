import { reducer } from './todos/index'
import { createStore } from 'redux';
// const TodoDB = require('./todos/DataAccess');
// const todoDB = new TodoDB();

const mongoose = require('mongoose');
// const mongoose = require('mongodb').MongoClient;
console.log(mongoose);
// mongoose.connect('mongodb://localhost:27017/TodoList', {useNewUrlParser: true});

const initState = {
    // todoList: todoDB.findTodos(),
    todoList:[]
}

export default createStore(reducer, initState)