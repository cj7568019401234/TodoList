const mongoose = require('mongoose');
// const Koa = require('koa')
// const app = new Koa()

class DbConnection {
    constructor(collectionName) {
        this.Uri = collectionName;
    }

    open() {    //连接Mongodb
        mongoose.connect(this.Uri, { useNewUrlParser: true })

        return new Promise((resolve, reject) => {
            mongoose.connect(this.Uri)
                .then(db => {
                    console.log(db);

                    this.Db = db;
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

    close() {   //关闭连接
        if (this.Db) {
            this.Db.close().catch(error => console.log(error));
        }
    }
}

module.exports = DbConnection;
