const path = require('path');
const Mongo = require('./mongo');

module.exports = (app) => {
  Mongo.init(path.resolve(__dirname, './models')).getModels();
}
