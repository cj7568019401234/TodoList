import * as axios from 'axios';

const baseApiUrl = ''; //mongodb

/**
 * 查找所有待办事项
 */
const getTodo = () => {
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

/**
 * 添加待办事项
 * @param {todo} 需要添加的todo对象 
 */
const addTodo = (todo) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/todo/add`, { todo })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

/**
 * 删除待办事项
 * @param {id} 需要删除的待办事项的id 
 */
const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/todo/delete`, { id })
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

/**
 * 需要删除的待办事项
 * @param {id} 需要扭转的待办事项的id 
 */
const toggleTodo = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/todo/toggle`, { id })
            .then((res) => {
                console.log(res)
                resolve(res);
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
    'getTodo': getTodo,
    'addTodo': addTodo,
    'deleteTodo': deleteTodo,
    'updateTodo': updateTodo,
    'toggleTodo': toggleTodo
};