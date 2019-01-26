/** 放一些比较杂的中间件 */
const bodyParser = require('koa-bodyparser');
const logger = require('./logger');

module.exports = (app) => {
  app.use(logger);
  app.use(bodyParser());
}
