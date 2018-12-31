const Koa = require('koa');
const routes = require('./route.js');
const app = new Koa();
// 路由
routes(app);
app.listen(8000);
