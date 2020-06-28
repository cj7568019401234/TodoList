import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, MODIFY_TODO, INIT_TODO } from './actionTypes'
const TodoService = require('../../services/todoServer');

export  default async (state = [], action) => {
    console.log(action);

    switch (action.type) {
        case ADD_TODO: {
            return {
                ...state,   //state的其他数据原样返回
                todoList: [
                    ...state.todoList,
                    {
                        //向服务器发起添加任务的请求，返回值为插入之后的数据的_id
                        id: await TodoService.default.addTodo(action),
                        text: action.text,
                        isFinished: false, //新增任务的初始状态为未完成
                        endTime: action.endTime,
                        endDate: action.endDate,
                    }   //新增的数据放在下面，增加任务时时页面变动小一点
                ]
            }
        };
        case TOGGLE_TODO: {//扭转任务状态
            TodoService.default.toggleTodo(action.id);  //向服务器发起请求，扭转任务状态
            return {
                ...state,   //state的其他数据原样返回
                todoList: state.todoList.map((item) => {
                    if (item.id === action.id) {
                        console.log(item)
                        return {
                            ...item,
                            isFinished: !item.isFinished,   //扭转状态
                        }
                    } else {
                        return item;
                    }
                }),
            }
        };
        case MODIFY_TODO: { //修改任务
            TodoService.default.updateTodo(action); //向服务器发起update请求
            return {
                ...state,   //state的其他数据原样返回
                todoList: state.todoList.map((item) => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            text: action.text,   //修改内容
                            endDate: action.endDate, //修改结束日期
                            endTime: action.endTime //修改结束时间
                        }
                    } else {
                        return item;
                    }
                })
            }
        };
        case DELETE_TODO: { //删除任务
            TodoService.default.deleteTodo(action.id);  //向服务器发起删除请求
            return {
                ...state,   //state的其他数据原样返回
                todoList: state.todoList.filter((item) => item.id !== action.id)  //直接去掉当前任务
            }
        };
        case INIT_TODO: {//查询任务
            return {
                ...state,   //state的其他数据原样返回
                todoList: await TodoService.default.getTodo() //向服务器发起查询请求
            }
        };
        default: {
            return state;
        };
    }
}
