import React from 'react';
import { Image } from 'qyrc';

import Header from './Header/index';

import scss from './index.module.scss';
import HomeBg from '@assets/img/home_bg.jpg';

const Desktop = (props) => {
  return (
    <Image src={HomeBg} className={scss['dosktop']}>
      <Header />
    </Image>
  );
}

export default Desktop;
