import _ from 'lodash';
import { message } from 'antd';
import JSEncrypt from 'jsencrypt';
import * as CONTS from '@config/consts';

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
};

/**
 * 请求错误信息处理函数
 * @param {Number} rescode   响应代码
 * @param {String} message   响应信息
 */
export const handleMessage = ({ rescode, message: info }) => {
  const map = {
    [CONTS.RESCODE.FAIL.VALUE]: message.error,
    [CONTS.RESCODE.SUCCESS.VALUE]: message.success,
  };
  const handler = map[rescode];
  handler && handler(info);
};

/**
 * 通用打印: 当前为开发环境下才允许打印
 */
export const log = (... args) => {
  _DEV_ && console.log(... args);
};

/**
 * 防抖
 * @param {Function} fn  传入函数
 * @param {Number} wait  等待时长
 */
export const debounce = (fn, wait) => {
  let timeout = null;
  return () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn.bind(null, escape), wait);
  };
};

/**
 * RSA 加密
 * @param {String} data   待加密数据
 * @returns {String}      加密后的数据
 */
export const rsa = data => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(PUBLICKEY);
  return encrypt.encrypt(data);
};

/**
 * 格式化数字
 * @param {Number} num  待处理数据
 */
export const formatNum = num => [... `${num}`].reverse()
  .reduce((res, current, index) => (
    `${current}${index !== 0 && index % 3 === 0 ? ',' : ''}${res}`, '')
  );
