/** 放一些比较杂的中间件 */
const logger = require('./logger');
const bodyParser = require('koa-bodyparser');

module.exports = (app) => {
  app.use(bodyParser());
  app.use(logger);
}
