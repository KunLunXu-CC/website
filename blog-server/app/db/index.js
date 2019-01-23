const path = require('path');
const mongo = require('./mongo');

module.exports = (app) => {
  app.context.db = {
    mongo: mongo(path.resolve(__dirname, './models'))
  };
}
