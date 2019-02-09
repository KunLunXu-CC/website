import React, { useMemo, useCallback } from 'react';
import { Popconfirm } from 'antd';
import { OPERATING_TYPE, OPERATING_TYPE_DESC } from '@config/constant';
import FontIcon from '../FontIcon';

// 配置
const settings = {
  [OPERATING_TYPE.EDIT]: {
    text: '', icon: '#icon-editor' , className: 'f22 linkp'
  }, 
  [OPERATING_TYPE.DELETE]: {
    text: '', icon: '#icon-shanchu',  className: 'f22 linkd', clickDisable: true 
  }, 
  [OPERATING_TYPE.CREATE]: {
    text: '', icon: '#icon-xinzeng',  className: 'f22 linkp'
  }, 
};

/**
 * 操作按钮
 * @param {String}    props.type        操作类型
 * @param {Function}  props.onClick     点击事件函数
 * @param {className} props.className   最佳 className
 */
export const IconBtn = ({type, onClick, className}) => {

  const setting = useMemo(() => {
    return settings[type];
  }, [type]);

  const getBtn = useCallback(() => (
    <span>
      <FontIcon
        onClick={!setting.clickDisable && onClick}
        icon={setting.icon}
        className={`cp ${setting.className} ${className}`}
      />
    </span>
  ), [setting, onClick, className]);

  if (type === OPERATING_TYPE.DELETE ){
    return (
      <Popconfirm 
        title="确定要删除该条记录?" 
        onConfirm={onClick} 
        okText="确定" 
        cancelText="取消">
        {getBtn()}
      </Popconfirm>
    );
  }
  return getBtn();
};
