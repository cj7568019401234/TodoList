import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, MODIFY_TODO } from './actionTypes'
const TodoService = require('../../services/todoServer');

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TODO: { //新增任务
            return {
                ...state,   //state的其他数据原样返回
                todoList: [
                    ...state.todoList,
                    {
                        id: action.id,
                        text: action.text,
                        isFinished: false, //新增任务的初始状态为未完成
                        endTime: action.endTime,
                        endDate: action.endDate,
                    }   //新增的数据放在下面，增加任务时时页面变动小一点
                ]
            }
        }
        case TOGGLE_TODO: { //扭转任务状态
            return {
                ...state,   //state的其他数据原样返回
                todoList: state.todoList.map((item) => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            isFinished: !item.isFinished,   //扭转状态
                        }
                    } else {
                        return item;
                    }
                })
            }
        }
        case DELETE_TODO: { //删除任务
            return {
                ...state,   //state的其他数据原样返回
                todoList: state.todoList.filter((item) => item.id !== action.id)  //直接去掉当前任务
            }

        }
        case MODIFY_TODO: { //修改任务
            TodoService.default.updateTodo(action);

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
        }
        default: {
            return state;
        }
    }
}