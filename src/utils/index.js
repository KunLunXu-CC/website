import { notification } from 'antd';
import JSEncrypt from 'jsencrypt';

/**
 * 根据需要过滤的列表过滤指定对象
 *
 * @param {object} obj          要过滤的对象
 * @param {Array} filterVaslue  要过滤的值的列表
 * @returns {object} 过滤后的对象
 */
export const filterObject = (obj, filterVaslue = []) => {
  const filter = {};
  _.forIn(obj, (value, key) => {
    !filterVaslue.includes(value) && (filter[key] = value);
  });
  return filter;
};

/**
 * 防抖
 * TODO: 替换为 lodash 中的函数
 *
 * @param {Function} fn  传入函数
 * @param {number} wait  等待时长
 * @returns {Function} 返回被调用函数
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
 *
 * @param {string} data   待加密数据
 * @param {string} publicKey 公钥
 * @returns {string}      加密后的数据
 */
export const rsa = (data, publicKey) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(data);
};

/**
 * 格式化数字
 * TODO: 改用 number 自带的格式化函数
 *
 * @param {number} num  待处理数据
 * @returns {string} 格式化后的字符串
 */
export const formatNum = (num) => [...`${num}`]
  .reverse()
  .reduce((total, ele, index) => `${ele}${
    index !== 0 && index % 3 === 0 ? ',' : ''
  }${total}`, '');

/**
 * 提示
 *
 * @param {object} params 函数对象参数, 除了下面两个菜参数, 其余参考 antd notification 组件参数, message description
 * @param {string} params.code 提示信息唯一值
 * @param {string} params.type 提示信息类别, 参考 antd 文档
 * @returns {undefined}
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
