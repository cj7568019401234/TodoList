const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const todoSchema = new mongoose.Schema({    //声明数据类型
    text: String,
    endTime: String,
    endDate: String,
    isFinished: Boolean,
});
const collectionName = 'TodoList';  //数据库名称
todo = mongoose.model('item', todoSchema, collectionName);
mongoose.connect(   //连接mongodb
    'mongodb://127.0.0.1:27017/' + collectionName,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

class TodoDB {
    /**
    * 查找所有TodoList
    */
    getTodo() {
        return new Promise((resolve, reject) => {
            todo
                .find()
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
    * 更新todo
    * @param {id} 需要修改的todo的id 
    * @param {item} 需要修改的todo对象
    */
    updateTodo(item) {
        return new Promise((resolve, reject) => {
            todo
                .updateOne(
                    { _id: new ObjectID(item.id) },
                    {
                        $set: {
                            text: item.text,
                            endTime: item.endTime,
                            endDate: item.endDate
                        }
                    })
                .then(() => {
                    resolve();
                    // connection.close();
                })
                .catch(error => {
                    reject(error);
                    // connection.close();
                });
        })
    }

    /**
     * 添加待办事项
     * @param {item} 待添加的todo对象 
     */
    addTodo(item) {
        return new Promise((resolve, reject) => {
            todo
                .create({
                    text: item.text,
                    endDate: item.endDate,
                    isFinished: item.isFinished,
                    endTime: item.endTime
                })
                .then(result => {
                    console.log(result, result._id);
                    resolve({ id: result._id });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
     * 删除待办事项
     * @param {id} 需要删除的待办事项的id 
     */
    deleteTodo(id, isFinished) {
        return new Promise((resolve, reject) => {
            todo
                .updateOne(
                    { _id: new ObjectID(id) },
                    {
                        $set: {
                            isFinished: isFinished
                        }
                    }
                )
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * 扭转待办事项的状态
     * @param {id} 需要扭转的待办事项的id 
     */
    toggleTodo(id) {
        return new Promise((resolve, reject) => {
            todo
                .findOne({ _id: new ObjectID(id) })
                .then((result) => {
                    console.log(result, result.isFinished, !result.isFinished);
                    todo.updateOne(
                        { _id: new ObjectID(id) },
                        {
                            $set: {
                                isFinished: !result.isFinished
                            }
                        })
                        .then(() => {
                            resolve();
                        })
                        .catch(error => {
                            reject(error);
                        });
                }
                )
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = TodoDB;