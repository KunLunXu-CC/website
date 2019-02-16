const { mapFiles } = require('../utils/helper');
const config = require('../config/system');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

/**
 * 链接数据库
 */
const connectServer = () => {
  try{
    const mongoSetting = config.mongo || {};
    const options = {
      useNewUrlParser: true,
    };
    const host = mongoSetting.host;
    const port = mongoSetting.port;
    const database = mongoSetting.database;
    mongoose.connect(`mongodb://${host}:${port}/${database}`, options);
    mongoose.set('debug', mongoSetting.debug);
  }catch(e){
    console.log('连接出错');
  }
}

/**
 * 初始化模型：
 * @param  {String} modelPath 模型路径
 * @return {Object} {模型名： 模型对象}
 */
const initModels = (modelPath) =>{
  const models = {};
  const stree = mapFiles(modelPath);
  _.forIn(stree, (value, fileName) => {
    if (value.type === 'MongoDB'){
      models[fileName] = mongoose.model(fileName, new Schema(value.fields))
    }
  });
  return models;
}

/**
 * 初始化数据
 * @param  {String} modelPath 模型路径
 */
module.exports = (modelPath) => {
  connectServer();
  return initModels(modelPath);
}
