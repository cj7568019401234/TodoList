const mongoose = require('../../server/DataAccess/node_modules/mongoose');

//定义数据模式，指定保存到TodoList集合
const TodoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isFinished: {
        type: Boolean,
        required: true
    },
    endTime: {
        type: String,
        required: false
    },
    endDate: {
        type: String,
        required: false
    }
}, { collection: 'TodoList' });

//定义数据集合的模型
const Todo = mongoose.model('TodoList', TodoSchema);

module.exports = Todo;