const TodoRepository = require('../DataAccess/TodoDB');
const assert = require('assert');
const todoRepository = new TodoRepository();

class TodoManager {
    /**
    * 查询所有的待办事项
    */
    getTodo() {
        return new Promise((resolve, reject) => {
            todoRepository
                .getTodo()
                .then(todoList => resolve(todoList))
                .catch(error => reject(error));
        });
    }

    /**
     * 更新待办事项
     * @param {item} 需要更新的todo对象 
     */
    updateTodo(item) {
        assert(item, 'item is required');
        return new Promise((resolve, reject) => {
            todoRepository
                .updateTodo(item)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }

    /**
     * 添加待办事项
     * @param {item} 需要添加的todo对象 
     * @return {result} 返回插入成功之后的对象的_id
     */
    addTodo(item) {
        assert(item, 'item is required');
        return new Promise((resolve, reject) => {
            todoRepository
                .addTodo(item)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    /**
     * 删除待办事项
     * @param {id} 需要删除的待办事项的id 
     */
    deleteTodo(id) {
        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            todoRepository
                .deleteTodo(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }

    /**
     * 扭转待办事项的状态
     * @param {id} 需要扭转的待办事项的id 
     */
    toggleTodo(id) {
        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            todoRepository
                .toggleTodo(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }
}

module.exports = TodoManager;