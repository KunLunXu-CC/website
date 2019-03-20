import React from 'react';
import style from './index.scss';

export default () => {
  return (
    <div className={style['block']}>
      <div className={style['block-header']}>
        header
      </div>
      <div className={style['block-content']}>
        content
      </div>
      <div className={style['block-footer']}>
        footer
      </div>
    </div>
  );
}