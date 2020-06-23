// const mongoose = require('mongoose');

// const Koa = require('koa')
// const app = new Koa()

// class DbConnection {
//     constructor(connectionUri) {
//         this.Uri = connectionUri;
//     }

//     open() {
//         mongoose.connect(this.Uri)

//         return new Promise((resolve, reject) => {
//             mongoose.connect(this.Uri)
//                 .then(db => {
//                     this.Db = db;
//                     resolve();
//                 })
//                 .catch(error => {
//                     console.log(error);
//                     reject();
//                 });
//         });
//     }

//     close() {
//         if (this.Db) {
//             this.Db.close().catch(error => console.log(error));
//         }
//     }
// }

// module.exports = DbConnection;

// db/db.js
// const mongoose = require('mongoose')
// const DB_URL = 'mongodb://localhost:27017/TodoList';


// mongoose.connect(DB_URL, { useNewUrlParser: true })

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

// mongoose.connection.on('connected',function() {
//    console.log('Mongoose connection open to '+DB_URL);
// });


// /**
// * 连接异常 error 数据库连接错误
// */
// mongoose.connection.on('error',function(err) {
//   console.log('Mongoose connection error: '+ err);
// });
// /**
// * 连接断开 disconnected 连接异常断开
// */
// mongoose.connection.on('disconnected',function() {
//   console.log('Mongoose connection disconnected');
// });

// module.exports = mongoose