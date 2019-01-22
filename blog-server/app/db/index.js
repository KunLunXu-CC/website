const path = require('path');
const mongo = require('./mongo');

module.exports = (app) => {
  mongo(path.resolve(__dirname, './models'));
}
