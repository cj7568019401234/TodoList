const router = require('koa-router')(); // 注意require('koa-router')返回的是函数
const TodoManager = require('../Services/TodoManager');
const todoManager = new TodoManager();  // 实例化TodoManager

router.prefix('/api');  //添加前缀

/**
 * 添加url-route，get请求
 */
router.get('/todo', async (ctx, next) => {
    ctx.response.body = await todoManager.listTodos();   //异步查询TodoList
})

/**
 * 添加url-route，post请求
 */
router.post('/todo/update', async (ctx, next) => {
    let item = ctx.request.body.todo;   //获取请求中需要修改的todo对象
    console.log(item,item.id);
    ctx.response.body = `<h4>Hello, ${item}!</h4>`;
});

module.exports = router.routes();
