import scss from './index.module.scss';

import { rsa } from '@utils';
import { useCallback } from 'react';
import { Icon } from '@kunlunxu/brick';
import { useNavigate } from 'react-router-dom';
import { Input, Form, Button, Divider } from 'antd';
import { useGetPublicKeyQuery, useLoginMutation } from '@store/graphql';

export default () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { data: publicKeyQuery } = useGetPublicKeyQuery();

  // 登录
  const onLogin = useCallback(async () => {
    const { account, password } = await form.validateFields();

    await login({
      account,
      password: rsa(password, publicKeyQuery.publicKey.data),
    });

    navigate('/');
  }, [form, login, navigate, publicKeyQuery]);

  return (
    <div className={scss.login}>
      <div className={scss.title}>
        Welcome back
      </div>
      <div className={scss['sub-title']}>
        Please enter your details to sign in.
      </div>
      <Button
        block
        size="large"
        className={scss.github}>
        <Icon type="icon-github" />
        Sign in with GitHub
      </Button>
      <Divider className={scss.divider}>
        or use account sign in
      </Divider>
      <div className={scss['login-form']}>
        <Form form={form}>
          <Form.Item
            name="account"
            rules={[{ required: true, message: '请输入账号!' }]}>
            <Input
              size="large"
              placeholder="请输入账号"
              prefix={<Icon type="icon-jenkins" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password
              size="large"
              placeholder="请输入密码"
              prefix={<Icon type="icon-suoping" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              onClick={onLogin}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
