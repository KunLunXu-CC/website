const { printStartCharPattern } = require('./utils/helper');
const middleware = require('./middleware');
const config = require('../config/system');
const graphql = require('./graphql');
const router = require('./route');
const Koa = require('koa');
const db = require('./db');
const app = new Koa();

db(app);
middleware(app);
router(app);
graphql(app);

app.listen(config.port, printStartCharPattern);
