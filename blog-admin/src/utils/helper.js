import _ from 'lodash';
import { message } from 'antd';

/**
 * 根据需要过滤的列表过滤指定对象
 * @param {Object} obj          要过滤的对象 
 * @param {Array} filterVaslue  要过滤的值的列表 
 */
export const filterObject = (obj, filterVaslue = []) => {
  const filter = {};
  _.forIn(obj, (value, key) => {
    !filterVaslue.includes(value) && (filter[key] = value);
  });
  return filter;
}

/**
 * 请求错误信息处理函数
 * @param {Object} data 
 * @param {Number} data.rescode   响应代码
 * @param {String} data.message   响应信息
 */
export const handleMessage = (data = {}) => {
  const map = {
    0: message.error,
    1: message.success,
  };
  const handler = map[data.rescode];
  handler && handler(data.message);
}
