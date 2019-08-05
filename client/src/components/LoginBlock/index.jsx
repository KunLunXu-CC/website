import React from 'react';
import { Image } from 'qyrc';
import { Input, Form, Button } from 'antd';

import scss from './index.module.scss';
import Head from '@assets/img/login_head.jpg';

const Desktop = (props) => {
  return (
    <div className={scss['login-body']}>
      <div className={scss['login-body-head']} ><Image src={Head}/></div>
      <div className={scss['login-body-form']}>
        <Form>
          <Form.Item>
            {props.form.getFieldDecorator('name')(
              <Input size="large" placeholder="请输入账号"/>
            )}
          </Form.Item>
          <Form.Item>
            {props.form.getFieldDecorator('passwd')(
              <Input size="large" placeholder="请输入密码"/>
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" block>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Form.create()(Desktop);
