import React from 'react';
import reducer from '/todo/reducer.js'
import { createStore } from 'redux';

const initState = {
    todoList:[]
}

export default createStore(reducer,initState)