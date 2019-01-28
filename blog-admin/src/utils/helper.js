import _ from 'lodash';

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
