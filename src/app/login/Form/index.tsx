'use client'
import scss from './index.module.scss';

import { rsa } from '@/utils';
import { useCallback } from 'react';
import { Icon } from '@kunlunxu/brick';
import { Button } from '@nextui-org/react';
import { Input, Form, Divider } from 'antd';
import { useRouter } from 'next/navigation';
import { useGetPublicKeyQuery, useLoginMutation } from '@/store/graphql';

const LogInForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [login] = useLoginMutation();
  const { data: publicKeyQuery } = useGetPublicKeyQuery();

  // 登录
  const handleSign = useCallback(async () => {
    const { account, password } = await form.validateFields();

    await login({
      account,
      password: rsa(password, publicKeyQuery?.publicKey?.data as string),
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
        fullWidth
        variant="bordered"
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
            rules={[{ required: true, message: 'Please enter your account!' }]}>
            <Input
              size="large"
              placeholder="Please enter your account"
              prefix={<Icon type="icon-jenkins" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password
              size="large"
              placeholder="Please enter your password"
              prefix={<Icon type="icon-suoping" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              fullWidth
              color="primary"
              onClick={handleSign}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LogInForm;
