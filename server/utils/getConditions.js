const _ = require('lodash');
const { STATUS } = require('../config/conts');


/**
 * 处理日期范围查询条件
 * @param {String} startTime  开始时间
 * @param {String} endTime    结束时间
 * @return {Object} {$gte: xx, $lte: xx}
 */
const getTimeConds = (startTime, endTime) => {
  const conds = {};
  startTime && (conds.$gte = startTime);
  endTime && (conds.$lte = endTime);
  return conds;
}

/**
 * 获取处理函数
 * @param {Object} params 查询参数
 * @param {Object} conds  查询条件
 * @param {String} key    当前处理值 key
 * @param {*}      value  当前处理值
 */
const getHandler = ({ params, conds, key, value }) => ([
  {
    conds: key === 'id',
    handler: () => (conds._id = value)
  }, {
    conds: key === 'ids',
    handler: () => (conds._id = { $in: value})
  }, {
    conds: key === 'status',
    handler: () => (conds.status = _.isArray(value) ? { $in: value} : value)
  }, {
    conds: ['startUpdateTime', 'endUpdateTime'].includes(key),
    handler: () => {
      if (conds.updateTime){return false;}
      conds.updateTime = getTimeConds(params.startUpdateTime, params.endUpdateTime);
    }
  }, {
    conds: ['startCreationTime', 'endCreationTime'].includes(key),
    handler: () => {
      if (conds.creationTime){return false;}
      conds.creationTime = getTimeConds(params.startCreationTime, params.endCreationTime);
    }
  },
  // 特殊字段处理
  {
    conds: key === 'tags',
    handler: () => (conds.tags = { $elemMatch: {$eq: value} })
  },
  // 按值类型进行处理
  {
    conds: _.isString(value),
    handler: () => (conds[key] = {$regex: value})
  }, {
    conds: _.isArray(value),
    handler: () => (conds[key] = {$in: value})
  }
]);

/**
 * 获取查询条件
 * @param {Object} params 查询参数  
 */
module.exports = ( params = {} ) => {
  const conds = { status: {$ne: STATUS.DELETE} };
  _.forIn(params, (value, key) => {
    const handler = (getHandler({ params, conds, key, value }).find( v => v.conds) || {}).handler;
    handler && handler();
  });
  return conds;
}
