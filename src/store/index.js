import { reducer } from './todos/index'
import { createStore } from 'redux';

const initState = {
    todoList: []
};

export default createStore(reducer, initState);



