import { notification } from 'antd';
import JSEncrypt from 'jsencrypt';

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
 * 通用打印: 当前为开发环境下才允许打印
 */
export const log = (...args) => {
  _DEV_ && console.log(...args);
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
 * @param {String} publicKey 公钥
 * @returns {String}      加密后的数据
 */
export const rsa = (data, publicKey) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(data);
};

/**
 * 格式化数字
 * @param {Number} num  待处理数据
 */
export const formatNum = (num) => [...`${num}`]
  .reverse()
  .reduce((total, ele, index) => `${ele}${
    index !== 0 && index % 3 === 0 ? ',' : ''
  }${total}`, '');

/**
 * 提示
 * @param {String} code 提示信息唯一值
 * @param {String} type 提示信息类别, 参考 antd 文档
 * @param {Object} options 参考 antd notification 组件参数, message description
 */
export const message = ({
  code,
  type = 'success',
  ...options
}) => {
  if (!code) {
    return false;
  }

  notification[type]({
    ...options,
    getContainer: () => (document.getElementById(code)),
  });
};
