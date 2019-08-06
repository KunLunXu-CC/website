const path = require('path');
const mongo = require('../../utils/mongo');

module.exports = (app) => {
  // 为 koa 上下文挂载变量 db
  app.context.db = {
    mongo: mongo(path.resolve(__dirname, '../../models'))
  };
}
