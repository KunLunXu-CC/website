const _ = require('lodash');
const { getTimeConds } = require('./helper');
const { STATUS } = require('../config/conts');

/**
 * 获取查询条件
 * @param {Object} params 查询参数 
 */
module.exports = ( params = {} ) => {
  const conds = { status: {$ne: STATUS.DELETE} };
  _.forIn(params, (value, key) => {
    let startTime = '';
    let endTime = '';
    switch (key){
      case 'id':
        conds._id= value;
        break;
      case 'ids':
        conds._id= {$in: value};
        break;
      case 'status':
        conds.status = { $in: value };
        break;
      case 'tag':
        conds.tags = { $elemMatch: {$eq: value} };
        break;
      case 'startUpdateTime':
      case 'endUpdateTime':
        startTime = params.startUpdateTime;
        endTime = params.endUpdateTime;
        conds.updateTime = getTimeConds(startTime, endTime);
        break;
      case 'startCreationTime':
      case 'endCreationTime':
        startTime = params.startCreationTime;
        endTime = params.endCreationTime;
        conds.creationTime = getTimeConds(startTime, endTime);
        break;
      default :
        conds[key] = { $regex: value };
        break;
    }
  });
  return conds;
}
