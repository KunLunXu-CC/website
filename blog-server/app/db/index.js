const path = require('path');
const Mongo = require('./mongo');

module.exports.getMongoModel = () => {
  const models = Mongo.init(path.resolve(__dirname, './models')).getModels();
  return models;
}
