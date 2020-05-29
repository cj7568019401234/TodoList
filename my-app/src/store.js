import reducer from './todos/reducer.js'
import { createStore } from 'redux';

const initState = {
    todoList:[]
}

export default createStore(reducer,initState)