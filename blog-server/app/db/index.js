const path = require('path');
const mongo = require('./mongo');

module.exports = (app) => {
  // 创建 app 上下文环境 db
  app.context.db = {
    mongo: mongo(path.resolve(__dirname, './models'))
  };
}
