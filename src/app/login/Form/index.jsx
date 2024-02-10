'use client'
import scss from './index.module.scss';

import { rsa } from '@/utils';
import { useCallback } from 'react';
import { Icon } from '@kunlunxu/brick';
import { Input, Form, Button, Divider } from 'antd';
import { useGetPublicKeyQuery, useLoginMutation } from '@/store/graphql';
import { useRouter } from 'next/navigation';

export default () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [login] = useLoginMutation();
  const { data: publicKeyQuery } = useGetPublicKeyQuery();

  // 登录
  const handleSign = useCallback(async () => {
    const { account, password } = await form.validateFields();

    await login({
      account,
      password: rsa(password, publicKeyQuery.publicKey.data),
    });

    router.push('/');
  }, [form, router, login, publicKeyQuery]);

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
        className={scss.github}
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}>
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
              onClick={handleSign}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
