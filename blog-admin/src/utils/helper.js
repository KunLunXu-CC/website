import _ from 'lodash';
import React from 'react';
import * as CONTS from '@config/conts';
import { message, Select } from 'antd';

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
}

/**
 * 通过固定格式的 conts(常量)， 获取 antd options
 * @param {String} name 常量名称
 */
export const getOptiionsOfconts = (name) => {
  const options = [];
  const Option = Select.Option;
  if (!CONTS[name]) {return options}
   _.forIn(CONTS[name], (value, key) => {
    options.push( <Option key={key} value={value.VALUE}>{value.DESC}</Option> );
  })
  return options;
}