import axios from 'axios';
import { message } from 'antd';
import { store } from '@model';

// 创建 axios 实例
const instance = axios.create({
  headers: { 'Content-Type': ' application/json' },
  baseURL: GLOBAL_SERVICER.HOST,
  timeout: 1000 * 60,
});

/**
 * 添加 axios 拦截器中间件 (记得方法中需要返回 config 或者 response 否则请求会被中止)
 * @param {Array} request 请求拦截器 格式： [请求成功处理函数 function(config)， 请求失败处理函数 function(error)]
 * @param {Array} response 响应拦截器 格式： [响应成功处理函数 function(response), 响应失败处理函数 function(error)]
 * @return {Object} { request: '移除请求拦截器 || null', response '移除响应拦截器 || null' }
 * @example
 * const interceptors = use({
 *  request: [function(config), function(error)],
 *  response: [function(response), function(error)]
 * });
 */
export const use = ({ request, response }) => ({
  request: _.isArray(request)
    ? instance.interceptors.request.use(request[0], request[1])
    : null,
  response: _.isArray(response)
    ? instance.interceptors.response.use(response[0], response[1])
    : null,
});

/**
 * 取消指定拦截器 (直接将上面use方法返回值传入即可移除对应的拦截器)
 * @param {Object} request 拦截请求时返回的值
 * @param {Object} response 拦截响应时返回的值
 * @example 配合上面的 use 方法使用
 * // 添加拦截器
 * const interceptors = use(...args);
 * // 取消对应拦截器
 * eject(interceptors);
 */
export const eject = ({ request, response }) => {
  request && instance.interceptors.request.eject(request);
  response && instance.interceptors.response.eject(response);
};

// 添加拦截器: 请求成功打印请求信息
use({
  response: [
    (response) => {
      const { request, config, data } = response;
      console.group(
        `%c request ${request.responseURL} => ${data?.resCode}`,
        'color: #48a8ee;',
      );

      try {
        // graphql 请求相关参数
        const { query, variables } = JSON.parse(config.data) ?? {};
        console.log('%c graphql.query: ', 'color: #67ac5b;', query);
        console.log('%c graphql.variables: ', 'color: #67ac5b;', variables);
      } catch {
        console.log('$c data', 'color: #67ac5b;', config.data);
      }

      console.log('%c response.data: ', 'color: #67ac5b;', data); // 请求响应数据
      console.log('%c response: ', 'color: #67ac5b;', response); // 完整信息
      console.groupEnd();
      return response;
    },
  ],
});

// 添加拦截器: 存储/添加 token
use({
  request: [
    (config) => {
      const authorization = localStorage.getItem('authorization');
      authorization && (config.headers.Authorization = authorization);
      return config;
    },
  ],
  response: [
    (response) => {
      response.headers.authorization &&
      localStorage.setItem('authorization', response.headers.authorization);
      return response;
    },
  ],
});

/**
 * // TODO: 上传问题解决后删除
 * 请求方法: 处理 spin
 * @param {String} spin 加载中标记
 * @param {Object} options 请求参数
 */
export const request =  async ({ spin: code, ...options }) => {
  store.dispatch({ type: 'spin/openSpin', code });
  const res = await instance({ ...options }).catch((err) => {
    message.error(`API 请求错误: ${err}`);
  });
  store.dispatch({ type: 'spin/closeSpin', code });
  return res;
};

/**
 * graphql 请求方法: 处理 spin
 * @param {String} spin 加载中标记
 * @param {String} query 请求文档
 * @param {Object} variables 请求文档参数
 * @returns {Function} 返回 graphql 请求方法
 */
export const graphql = ({ query, getRes }) => (async ({
  spin,
  ...variables
} = {}) => {
  store.dispatch({ type: 'spin/openSpin', code: spin });

  const res = await instance({
    method: 'post',
    data: { query, variables },
    url: GLOBAL_SERVICER.GRAPHQL_URL,
  }).catch((err) => {
    message.error(`API 请求错误: ${err}`);
  });

  store.dispatch({ type: 'spin/closeSpin', code: spin });
  return getRes(res?.data?.data || {});
});

export default graphql;
