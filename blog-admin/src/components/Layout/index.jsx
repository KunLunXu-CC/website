import React from 'react';
import { Form } from 'antd';
import './index.scss';

/**
 * 固定长度的 label 布局
 * @param {Object}            children      组件的包裹的内容块
 * @param {String}            label         label 文字
 * @param {String || NUmber}  length        label 长度
 * @param {Boolean}           required      是否必填（多一个红 *）
 * @param {Boolean}           right         label对齐方式（是否右对齐）
 */
export const StableLabel = ({ children, label, length = 4 , required, right}) => {

  return (
    <Form.Item>
      <div className="stable-label-components">
        <div 
          className="stable-label-components-label"
          style={{
            flex: `0 0 ${Number(length) + 1}em`,
            textAlign: right ? 'right' : 'left'
          }}
        >
          { required ? <span style={{color: '#f5222d'}}> * </span> : '' }
          {label}<span style={{padding: '0 .8em 0 .2em'}}>:</span>
        </div>
        <div className="stable-label-components-content">
          {children}
        </div>
      </div>
    </Form.Item>
  );
} 
