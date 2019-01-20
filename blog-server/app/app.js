const Koa = require('koa');
const graphql = require('./graphql');
const router = require('./route');
const app = new Koa();

router(app);
graphql(app);

app.listen(7070);
