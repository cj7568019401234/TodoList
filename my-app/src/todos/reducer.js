import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes'

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TODO: {
            return [
                {
                    id: action.id,
                    text: action.text,
                    finished: false
                },
                ...state
            ]
        }
        case TOGGLE_TODO: {
            return state.map((item) => {
                if (item.id === action.id) {
                    return {
                        id: action.id,
                        text: action.text,
                        finished: !item.finished,
                    }
                } else {
                    return item;
                }
            })
        }
        case DELETE_TODO: {
            return state.filter((item) => item.id !== action.id)
        }
        default: {
            return state;
        }
    }


}