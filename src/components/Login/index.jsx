/**
 * 用户登录组件
 * @param {Function} props.onLogin  登录触发事件 ({ account, password }) => {} 
 * @returns {ReactDOM}
 */

import _ from 'lodash';
import React from 'react';
import { Image } from 'qyrc';
import { Input, Form, Button, Icon } from 'antd';

import scss from './index.module.scss';
import Head from '@assets/img/login_head.jpg';

const useStateHook = (props) => {
  // 登录
  const onLogin = () => {
    props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors){return false;}
      _.isFunction(props.onLogin) && props.onLogin({ ... values });
    });
  };

  return { onLogin };
};

const Desktop = (props) => {
  const state = useStateHook(props);
  return (
    <div className={scss['login']}>
      <div className={scss['login-head']} ><Image src={Head}/></div>
      <div className={scss['login-form']}>
        <Form>
          <Form.Item>
            {props.form.getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input 
                size="large" 
                placeholder="请输入账号"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
            )}
          </Form.Item>
          <Form.Item>
            {props.form.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input.Password 
                size="large"
                placeholder="请输入密码"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" block onClick={state.onLogin}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Form.create()(Desktop);
