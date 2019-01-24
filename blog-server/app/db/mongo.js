const mongoose = require('mongoose');
const { mapFiles } = require('../utils/helper');
const _ = require('lodash');
const Schema = mongoose.Schema;

/**
 * 链接数据库
 */
const connectServer = () => {
  try{
    const options = {
      useNewUrlParser: true,
    };
    mongoose.connect('mongodb://localhost/blog', options);
    mongoose.set('debug', true);
  }catch(e){
    console.log('连接出错');
  }
}

/**
 * 获取模型：
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
