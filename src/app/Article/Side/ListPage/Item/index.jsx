import React from 'react';
import { Image } from 'qyrc';
import scss from './index.module.scss';
import IMG from '@assets/img/left.jpg';

export default (props) => {
  return (
    <div className={scss['item']}>
      <Image src={props.data.img} >
        item
      </Image>
    </div>
  );
}
