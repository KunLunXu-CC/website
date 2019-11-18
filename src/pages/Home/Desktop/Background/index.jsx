import React from 'react';
import { Image } from 'qyrc';

import scss from './index.module.scss';
import HomeBg from '@assets/img/home_bg.jpg';
import Error from './Error';
import Loading from './Loading';

export default props => (
  <Image
    src={HomeBg}
    error={<Error/>}
    loading={<Loading/>}
    className={scss.background}>
      111111111111
    {props.children}
  </Image>
);
