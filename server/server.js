const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const todosRouter = require('./routers/TodoRouter');    // app references
const PORT = process.env.PORT || 8000;  // initialization
const app = new Koa();  // configure server

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url} ${ctx.header.referer}...`);
    await next();
});

app.use(bodyParser());
app.use(todosRouter);

// start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});