import React from 'react';
import { Image } from 'qyrc';

// import { Login as C_Login } from '@components';

import scss from './index.module.scss';
import HomeBg from '@assets/img/home_bg.jpg';

const Login = (props) => {
  return (
    <Image src={HomeBg} className={scss['login']}>
      {/* <C_Login /> */}
      1111111111111
    </Image>
  );
}

export default Login;
