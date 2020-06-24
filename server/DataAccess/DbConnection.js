const mongoose = require('mongoose');

const Koa = require('koa')
const app = new Koa()

class DbConnection {
    constructor(connectionUri) {
        this.Uri = connectionUri;
    }

    open() {
        mongoose.connect(this.Uri)

        return new Promise((resolve, reject) => {
            mongoose.connect(this.Uri)
                .then(db => {
                    this.Db = db;
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

    close() {
        if (this.Db) {
            this.Db.close().catch(error => console.log(error));
        }
    }
}

module.exports = DbConnection;
