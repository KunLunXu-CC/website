export * from './tag';
import React from 'react';
import { Tag } from 'antd';
import moment from 'moment';
import { FontIcon } from '@components';

// column 类型映射渲染函数
const mapTypeToRender = (value) => ({
  default: (text, record, index) => (text || '未定义值'),
  date: (text, record, index) => (
    text ? moment(text).format('YYYY-MM-DD') : '未知时间'
  ),
  status: (text, record, index) => (
    text ? value.desc[text] : '未知状态'
  ),
  color: (text, record, index) => (
    text ? (
      <Tag color={text}>
        <span style={{display: 'inline-block', width: '30px'}}></span>
      </Tag>
    ) : '未定义颜色'
  ),
  icon: (text, record, index) => (
    text ? <FontIcon icon={text} size="20px"/> : '未定义图标'
  )
});

// 根据类型（Date Status Color Icon）处理 columns 函数
export default (columns = []) => (append = []) => {
  const cols = columns.map((value, key) => {
    value.render = value.type 
      ? mapTypeToRender(value)[value.type] 
      : mapTypeToRender(value).default;
    return value;
  });
  append.forEach((value, key) => {
    cols.push(value);
  });
  return cols;
} 
