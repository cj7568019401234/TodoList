const router = require('koa-router')(); // 注意require('koa-router')返回的是函数
const TodoManager = require('../services/TodoManager');
const todoManager = new TodoManager();  // 实例化TodoManager

router.prefix('/api');  //添加前缀

router.get('/todo', async (ctx, next) => {  //添加url-route，get请求
    const res = await todoManager.getTodo();   //异步查询TodoList
    ctx.response.body = res;
    console.log(res);
})

router.post('/todo/update', async (ctx, next) => {  //添加url-route，post请求
    let item = ctx.request.body.todo;   //获取请求中需要修改的todo对象
    console.log(item);
    const res = await todoManager.updateTodo(item); //修改TodoList
    ctx.response.body = res   
});

router.post('/todo/add', async (ctx, next) => { //添加url-route，post请求
    let item = ctx.request.body.todo;   //获取请求中需要添加的todo对象
    console.log(item);
    ctx.response.body = await todoManager.addTodo(item);   //异步修改TodoList
});

router.post('/todo/delete', async (ctx, next) => {
    let id = ctx.request.body.id;   //获取请求中需要删除的待办事项的_id
    console.log(id);
    ctx.response.body = await todoManager.deleteTodo(id);   //异步删除TodoList
});

router.post('/todo/toggle', async (ctx, next) => {
    let id = ctx.request.body.id;   //获取请求中需要扭转的待办事项的_id
    const res = await todoManager.toggleTodo(id);   //扭转TodoList
    console.log(res);
    ctx.response.body = res
});

module.exports = router.routes();
