const mongoModels = require('../db').getMongoModel();

module.exports.getTag = async (params) => {
  return mongoModels.Tag.find();
}
