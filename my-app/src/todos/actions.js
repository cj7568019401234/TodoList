import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes.js';


let nextTaskId = 0;

export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextTaskId++,
    status: 'unfinished',
    text: text
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id
})

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id: id
})