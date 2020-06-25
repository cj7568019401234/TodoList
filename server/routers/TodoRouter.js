const router = require('koa-router')(); // 注意require('koa-router')返回的是函数
const TodoManager = require('../Services/TodoManager'); // app references
const todoManager = new TodoManager();  // 实例化TodoManager

router.prefix('/api');  //添加前缀

router.get('/todos', async (ctx, next) => { // 添加url-route
    ctx.response.body = await todoManager.listTodos();   //异步查询TodoList
})

module.exports = router.routes();
