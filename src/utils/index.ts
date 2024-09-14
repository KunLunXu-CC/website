import { notification } from 'antd';
import { forIn } from 'lodash';

/**
 * 根据需要过滤的列表过滤指定对象
 *
 * @param {object} obj          要过滤的对象
 * @param {Array} filterValues  要过滤的值的列表
 * @returns {object} 过滤后的对象
 */
export const filterObject = (obj: Record<string, any>, filterValues: string[] = []) => {
  const filter = {};
  forIn(obj, (value, key) => {
    !filterValues.includes(value) && (filter[key] = value);
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
export const debounce = (fn: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

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
export const rsa = async (data: string, publicKey: string) => {
  const JSEncrypt = (await import('jsencrypt')).default;
  const encrypt = new JSEncrypt({});
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(data);
};

/**
 * 提示
 *
 * @param {object} params 函数对象参数, 除了下面两个菜参数, 其余参考 antd notification 组件参数, message description
 * @param {string} params.code 提示信息唯一值
 * @param {string} params.type 提示信息类别, 参考 antd 文档
 * @returns {undefined}
 */
export const message = ({ code, type = 'success', ...options }) => {
  if (!code) {
    return false;
  }

  notification[type]({
    ...options,
    getContainer: () => document.getElementById(code),
  });
};

/**
 * 获取 url 参数
 *
 * @param {string} key 要获取的指定参数
 * @returns {string|URLSearchParams} 返回 URLSearchParams 对象或者参数值
 */
export const urlParams = (key: string) => {
  const urlSearchParams = new URLSearchParams(location.search);

  if (key) {
    return urlSearchParams.get(key);
  }

  return urlSearchParams;
};

// 获取 OSS 对应资源 url
export const getOssUrl = (fileName: string) => `https://kunlunxu.oss-cn-hangzhou.aliyuncs.com/${fileName}`;
