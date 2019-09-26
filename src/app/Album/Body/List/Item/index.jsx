import React from 'react';
import { Image, Icon } from 'qyrc';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['item']}>
      <div className={scss['preview']}>
        <Image src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg"/>
      </div>
      <div className={scss['info']}>
        <div className={scss['info-icon']}>
          <Icon type="icon-genghuanfengmian" />
        </div>
        <div className={scss['info-body']}>
          <div className={scss['info-body-desc']}>
            封面(使用 3 次)
          </div>
          <div className={scss['info-body-time']}>2019 / 09 / 21</div>
        </div>
      </div>
    </div>
  );
}
