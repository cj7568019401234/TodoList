// // const ObjectID = require('mongodb').ObjectID;
// // const DbConnection = require('../DbConnection');

// // const collection = 'TodoList';

// // const connect = () => new DbConnection('mongodb://127.0.0.1:27017/TodoList');

// // const filters = {
// //     id: (id) => {
// //         return { _id: new ObjectID(id) };
// //     },
// //     tag: (tag) => {
// //         return { tags: { $regex: new RegExp(tag, 'i') } };
// //     },
// //     title: (title) => {
// //         return { 'title': { $regex: new RegExp(title, 'i') } };
// //     }
// // };

// // class TodoDB {
// //     addTodo(note) {
// //         const connection = connect();

// //         return new Promise((resolve, reject) => {
// //             connection
// //                 .open()
// //                 .then(() => {
// //                     connection.Db.collection(collection)
// //                         .findOne(filters.title(note.title))
// //                         .then(noteData => {
// //                             if (noteData) {
// //                                 connection.close();
// //                                 reject(Error('Note already exists'));
// //                             } else {
// //                                 connection.Db
// //                                     .collection(collection)
// //                                     .insertOne(note)
// //                                     .then(result => {
// //                                         connection.close();
// //                                         resolve({ id: result.insertedId });
// //                                     })
// //                                     .catch(error => {
// //                                         connection.close();
// //                                         reject(error);
// //                                     });
// //                             }
// //                         })
// //                         .catch(error => {
// //                             connection.close();
// //                             reject(error);
// //                         });
// //                 })
// //                 .catch(error => {
// //                     reject(error);
// //                     connection.close();
// //                 });
// //         });
// //     }

// //     removeTodo(id) {
// //         const connection = connect();

// //         return new Promise((resolve, reject) => {
// //             connection
// //                 .open()
// //                 .then(() => {
// //                     connection.Db
// //                         .collection(collection)
// //                         .findOneAndDelete(filters.id(id))
// //                         .then(() => {
// //                             resolve();
// //                             connection.close();
// //                         })
// //                         .catch(error => {
// //                             reject(error);
// //                             connection.close();
// //                         });
// //                 })
// //                 .catch(error => {
// //                     resolve(error);
// //                     connection.close();
// //                 });
// //         });
// //     }

// //     updateTodo(id, note) {
// //         const connection = connect();

// //         return new Promise((resolve, reject) => {
// //             connection
// //                 .open()
// //                 .then(() => {
// //                     connection.Db
// //                         .collection(collection)
// //                         .update(
// //                             filters.id(id),
// //                             {
// //                                 $set: {
// //                                     title: note.title,
// //                                     content: note.content,
// //                                     tags: note.tags,
// //                                     updated_date: note.updated_date
// //                                 }
// //                             })
// //                         .then(() => {
// //                             resolve();
// //                             connection.close();
// //                         })
// //                         .catch(error => {
// //                             reject(error);
// //                             connection.close();
// //                         });
// //                 })
// //                 .catch(error => {
// //                     resolve(error);
// //                     connection.close();
// //                 });
// //         });
// //     }

// //     findTodos() {
// //         const connection = connect();

// //         return new Promise((resolve, reject) => {
// //             connection
// //                 .open()
// //                 .then(() => {
// //                     connection.Db.collection(collection)
// //                         .then(todos => {
// //                             resolve(todos);
// //                             connection.close();
// //                         })
// //                         .catch(error => {
// //                             reject(error);
// //                             connection.close();
// //                         });
// //                 })
// //                 .catch(error => {
// //                     reject(error);
// //                     connection.close();
// //                 });
// //         });
// //     }
// // }

// // module.exports = TodoDB;

// // db/index.js
const mongoose = require('../DbConnection')
// const Schema = mongoose.Schema;

// const ceshiSchema = new Schema({
//   title: String,
//   body: String,
//   date: Date
// });

// const MyModel = mongoose.model('ceshi', ceshiSchema);


class Mongodb {
//   constructor () {

//   }
// // 查询
//   query () {
//      return new Promise((resolve, reject) => {
//        MyModel.find({}, (err, res) => {
//          if(err) {
//            reject(err)
//          }
//          resolve(res)
//        })
//      })
//   }
// // 保存
//   save (obj) {
//      const m = new MyModel(obj)
//      return new Promise((resolve, reject)=> {
//        m.save((err, res) => {
//          if (err) {
//            reject(err)
//          }
//          resolve(res)
//          console.log(res)
//        })
//      })
     
//   }
}
module.exports = new Mongodb()