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

const filters = {
    id: (id) => {
        return { _id: new ObjectID(id) };
    },
    tag: (tag) => {
        return { tags: { $regex: new RegExp(tag, 'i') } };
    },
    title: (title) => {
        return { 'title': { $regex: new RegExp(title, 'i') } };
    }
};

class TodoDB {
    /**
    * 查找所有TodoList
    */
    findTodos() {
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
    updateTodo(id, item) {
        return new Promise((resolve, reject) => {
            todo
                .update(
                    filters.id(id),
                    {
                        $set: {
                            text: item.text,
                            isFinished: item.isFinished,
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
            .catch(error => {
                resolve(error);
                // connection.close();
            });
    }

    addTodo(note) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.title(note.title))
                        .then(noteData => {
                            if (noteData) {
                                connection.close();
                                reject(Error('Note already exists'));
                            } else {
                                connection.Db
                                    .collection(collection)
                                    .insertOne(note)
                                    .then(result => {
                                        connection.close();
                                        resolve({ id: result.insertedId });
                                    })
                                    .catch(error => {
                                        connection.close();
                                        reject(error);
                                    });
                            }
                        })
                        .catch(error => {
                            connection.close();
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }

    removeTodo(id) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .findOneAndDelete(filters.id(id))
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    resolve(error);
                    connection.close();
                });
        });
    }
}

// mongoose.disconnect();
module.exports = TodoDB;