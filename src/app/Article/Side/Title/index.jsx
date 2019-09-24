import React from 'react';
import { Icon } from 'qyrc';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['title']}>
      <Icon type="icon-remen" /> 热门
    </div>
  );
}
