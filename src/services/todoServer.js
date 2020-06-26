import * as axios from 'axios';

const baseApiUrl = ''; //mongodb

/**
 * 查找所有待办事项
 */
const findTodo = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/todo`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
};

/**
 * 更新待办事项
 * @param {todo} 需要更新的todo对象
 */
const updateTodo = (todo) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/todo/update`, { todo })
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

// add todo
const addTodo = (title, content, tags = []) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/todos`, {
                'title': title,
                'content': content,
                'tags': tags.join()
            })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });

    });

};

// remove todo
const removeTodo = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/todos/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
};

// exports
export default {
    'findTodo': findTodo,
    'addTodo': addTodo,
    'removeTodo': removeTodo,
    'updateTodo': updateTodo
};