import React from 'react';
import { Image } from 'qyrc';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';

import { useStore } from '@store';
import { Login as C_Login } from '@components';

import scss from './index.module.scss';
import HomeBg from '@assets/img/home_bg.jpg';

const useStateHook = (props, store) => {
  // 登录
  const onLogin = ({ account, password }) => {
    store.user.login({ account, password }).then(({ logined }) => {
      logined ?
      props.history.push('/') :
      message.warning('登录失败, 账号或密码错误！');
    });
  };
  return { onLogin };
};

const Login = (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <Image src={HomeBg} className={scss['login']}>
      <C_Login onLogin={state.onLogin}/>
    </Image>
  );
}

export default withRouter(Login);
