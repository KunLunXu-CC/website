import axios from 'axios';
import _ from 'lodash';
export * from './tag';

// 创建 axios 实例
const instance = axios.create({
  headers: {'Content-Type':' application/json'},
  baseURL: GLOBAL_BLOG_SERVER,
  timeout: 1000,
});

/* 全局通用拦截器设置（打印数据） */
const interceptorsWithPrintInfo = () => {
  instance.interceptors.request.use(function (config) {
    console.log('request:', config);
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
  instance.interceptors.response.use(function (response) {
    console.log('response:', response);
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

/**
 * 添加 axios 拦截器中间件(记得方法中需要返回 config 或者 response 否则请求会被中止)
 * @param {Array} request   请求拦截器[请求成功处理函数(config)， 请求失败处理函数(error)]
 * @param {Array} response  响应拦截器[响应成功处理函数(response), 响应失败处理函数(error)]
 */
export const use = ({request, response}) => {
  _.isArray(request) && instance.interceptors.request.use(request[0], request[1]);
  _.isArray(response) && instance.interceptors.response.use(response[0], response[1]);
}

interceptorsWithPrintInfo();
export default instance;
