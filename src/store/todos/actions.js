import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, MODIFY_TODO, INIT_TODO } from './actionTypes.js';

/**
 * 从服务器获取任务
 */
export const initTodo = (todoList) => ({
    type: INIT_TODO,
    todoList: todoList
})

/**
 * 添加新任务
 * @param {text} 新增任务的文案 
 */
export const addTodo = (text, isFinished, endDate, endTime) => ({
    type: ADD_TODO,
    text: text,
    isFinished: isFinished,
    endDate: endDate,
    endTime: endTime
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

/**
 * 修改任务
 * @param {id} 任务id 
 * @param {text} 任务内容
 * @param {endDate} 任务结日期
 * @param {endTime} 任务结束时间
 */
export const modifyTodo = (id, text, endDate, endTime) => ({
    type: MODIFY_TODO,
    id: id,
    text: text,
    endDate: endDate,
    endTime: endTime
})