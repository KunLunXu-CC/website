import React, { useEffect } from 'react';
import { message } from 'antd';
import { useStore } from '@store';
import { withRouter } from 'react-router-dom';

import Form from './Form';
import Background from './Background';

const useStateHook = (props, store) => {
  // 登录
  const onLogin = ({ account, password }) => {
    store.user.login({ account, password }).then(({ logined }) => {
      logined
        ? props.history.push('/')
        : message.warning('登录失败, 账号或密码错误！');
    });
  };

  useEffect(() => {
    localStorage.setItem('authorization', null);
  }, []);

  return { onLogin };
};

const Login = props => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <Background>
      <Form onLogin={state.onLogin}/>
    </Background>
  );
};

export default withRouter(Login);
