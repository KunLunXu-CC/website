import React from 'react';
import { Image } from 'qyrc';

import scss from './index.module.scss';
import HomeBg from '@assets/img/home_bg.jpg';

export default props => (
  <Image src={HomeBg} className={scss.dosktop}>
    {props.children}
  </Image>
);
