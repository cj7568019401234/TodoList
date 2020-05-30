import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes.js';


let nextTaskId = 0;

/**
 * 添加新任务
 * @param {text} 新增任务的文案 
 */
export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextTaskId++,
    text: text
})

/**
 * 扭转任务状态
 * @param {id} 当前扭转状态的任务id 
 */
export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id
})

/**
 * 删除任务
 * @param {id} 当前删除的任务的id
 */
export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id: id
})