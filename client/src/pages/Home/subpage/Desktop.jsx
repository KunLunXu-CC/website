import React from 'react';
import { Image } from 'qyrc';
import scss from '../index.module.scss';
import HomeBg from '@assets/img/home_bg.jpg';

const Desktop = (props) => {
  return (
    <Image src={HomeBg} className={scss['dosktop']}>
    {/*  */}
    </Image>
  );
}

export default Desktop;
