import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Card } from 'antd';
import { Icon } from 'qyrc';

/**
 * antd card 浅封装
 * @param {String} props.title 标题
 * @param {String} props.icon 图标
 * @param {String} props.className 添加 className
 * @param {String} props.extraIcon extra 要显示的图标
 * @param {Function} props.onClickExtra 点击 extra 事件
 */
export default props => (
  <Card
    title={
      <React.Fragment>
        <Icon type={props.icon}/>
        {props.title}
      </React.Fragment>
    }
    extra={
      props.extraIcon ?
        <Icon
          type={props.extraIcon}
          onClick={props.onClickExtra}
        /> : null
    }
    className={classNames(scss.card, props.className)}>
    {props.children}
  </Card>
);
