import React from 'react';
import { Image } from 'qyrc';
import scss from './index.module.scss';

export default (props) => {
  return (
    <Image
      height="100px"
      src={props.data.img}
      className={scss['item']}>
      <div className={scss['mask']}>
        <div className={scss['title']}>
          PIXIV
        </div>
        <div className={scss['desc']}>
          P 站的正确打开方式
        </div>
      </div>
    </Image>
  );
}
