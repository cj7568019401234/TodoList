import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes'

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TODO: {    //新增任务
            return [
                {
                    id: action.id,
                    text: action.text,
                    finished: false //新增任务的初始状态为未完成
                },
                ...state
            ]
        }
        case TOGGLE_TODO: { //扭转任务状态
            return state.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        finished: !item.finished,   //扭转状态
                    }
                } else {
                    return item;
                }
            })
        }
        case DELETE_TODO: { //删除任务
            return state.filter((item) => item.id !== action.id)    //直接去掉当前任务
        }
        default: {
            return state;
        }
    }
}