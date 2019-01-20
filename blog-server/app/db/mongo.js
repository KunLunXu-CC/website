const mongoose = require('mongoose');
const { mapFiles } = require('../utils/helper');
const _ = require('lodash');
const Schema = mongoose.Schema;

class Mongo {
  constructor(modelPath){
    this.modelPath = modelPath;
    this.connectServer();
    this.getModels();
  }

  /**
   * 链接数据库
   */
  connectServer(){
    try{
      mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });
    }catch(e){
      console.log('连接出错');
    }
  }

  /**
   * 获取模型：
   * @return {Object} {模型名： 模型对象}
   */
  getModels(){
    const modelPath = this.modelPath;
    if (Mongo.models){return Mongo.models;}
    const models = {};
    const stree = mapFiles(modelPath);
    _.forIn(stree, (value, fileName) => {
      if (value.type === 'MongoDB'){
        models[fileName] = mongoose.model(fileName, new Schema(value.fields))
      }
    });
    Mongo.models = models;
    return Mongo.models;
  }
}

module.exports = Mongo;