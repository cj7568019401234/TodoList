const mongoose = require('mongoose');

class DbConnection {
    constructor(schema, collectionName) {
        this.Uri = 'mongodb://127.0.0.1:27017/' + collectionName;
        this.schema = schema;
    }

    open() {    //连接Mongodb
        todo = mongoose.model('item', schema, collectionName);
        mongoose.connect(   //连接mongodb
            this.Uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

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
        mongoose.disconnect().catch(error => console.log(error));
    }
}

module.exports = DbConnection;
