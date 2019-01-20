const path = require('path');
const Mongo = require('./mongo');

module.exports.getMongoModel = () => {
  const models = new Mongo(path.resolve(__dirname, './models')).getModels();
  return models;
}
