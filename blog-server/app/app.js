const Koa = require('koa');
const routes = require('./routes/index');
const app = new Koa();
// 路由
routes(app);
app.listen(8000);
