import React from 'react';
import { Form } from 'antd';
import './index.scss';

/**
 * 自定义 FormItem 使用 flex 布局， 可指定 label 长度， 控件可自适应 width
 * @param {Object}            children      组件的包裹的内容块
 * @param {String}            label         label 文字
 * @param {String || NUmber}  length        label 长度
 * @param {Boolean}           required      是否必填（多一个红 *）
 * @param {Boolean}           left          label对齐方式（是否左对齐， 默认右边对齐）
 */
export const FormItem = ({ children, label, length = 4 , required, left}) => {
  return (
    <div className="private-form-item">
      <div 
        className="private-form-item-label"
        style={{
          paddingTop: '9px',
          flex: `0 0 ${Number(length) + 1}em`,
          textAlign: left ? 'left' : 'right'
        }}
      >
        { required ? <span style={{color: '#f5222d'}}> * </span> : '' }
        {label}<span style={{padding: '0 .8em 0 .2em'}}>:</span>
      </div>
      <div className="private-form-item-content">
      <Form.Item>
        {children}
      </Form.Item>
      </div>
    </div>
  );
} 
