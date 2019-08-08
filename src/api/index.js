import { log } from '@utils';
import axios from 'axios';
import _ from 'lodash';
export * from './tag';
export * from './common';
export * from './user';

// 创建 axios 实例
const instance = axios.create({
  headers: { 'Content-Type':' application/json' },
  baseURL: GLOBAL_SERVICE,
  timeout: 1000,
});

/* 全局通用拦截器设置（打印数据） */
const interceptorsWithPrintInfo = () => {
  instance.interceptors.request.use(function (config) {
    log('request:', config);
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
  instance.interceptors.response.use(function (response) {
    log('response:', response);
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

/**
 * 添加 axios 拦截器中间件(记得方法中需要返回 config 或者 response 否则请求会被中止)
 * @param   {Array}  request   请求拦截器[请求成功处理函数 function(config)， 请求失败处理函数 function(error)]
 * @param   {Array}  response  响应拦截器[响应成功处理函数 function(response), 响应失败处理函数 function(error)]
 * @return  {Object} { request: '移除请求拦截器 || null', response '移除响应拦截器 || null' }
 * 
 * @example 
 * const interceptors = use({ 
 *  request: [function(config), function(error)],
 *  response: [function(response), function(error)]
 * });
 */
export const use = ({request, response}) => ({
  request: _.isArray(request) ? instance.interceptors.request.use(request[0], request[1]) : null,
  response　: _.isArray(response) ? instance.interceptors.response.use(response[0], response[1]) : null,
});

/**
 * 取消指定拦截器(直接将上面use方法返回值传入即可移除对应的拦截器)
 * @param {Object}  request 　拦截请求时返回的值
 * @param {Object}  response 拦截响应时返回的值
 * 
 * @example 配合上面的 use 方法使用
 * // 添加拦截器
 * const interceptors = use(...args);
 * // 取消对应拦截器
 * eject(interceptors);
 */
export const eject = ({request, response}) => {
  request &&　instance.interceptors.request.eject(request);
  response　&& instance.interceptors.response.eject(response);
}

interceptorsWithPrintInfo();
export default instance;
