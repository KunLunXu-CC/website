'use client';
import scss from './index.module.scss';

import { rsa } from '@/utils';
import { useCallback } from 'react';
import { Icon } from '@kunlunxu/brick';
import { Button } from '@nextui-org/react';
import { Input, Form, Divider } from 'antd';
import { useRouter } from 'next/navigation';
import { usePublicKeyQuery, useLoginMutation } from '@/server/user';

const LogInForm = () => {
  const [form] = Form.useForm();
  const { mutateAsync: login } = useLoginMutation();
  const { data: publicKeyQueryData } = usePublicKeyQuery();

  // 登录
  const handleSign = useCallback(async () => {
    const { account, password } = await form.validateFields();
    const passwordEncrypt = await rsa(password, publicKeyQueryData?.publicKey.data!);

    if (!passwordEncrypt) {
      return;
    }

    await login({ account, password: passwordEncrypt });

    // 登录成功后, 跳转到首页, 使用 window.location.href 会刷新页面(这样才能够重新获用户信息)
    window.location.href = '/';
  }, [form, login, publicKeyQueryData]);

  // // 清除 JWT cookie
  // useEffect(() => {
  //   document.cookie = '';
  // }, []);

  return (
    <div className={scss.login}>
      <div className={scss.title}>Welcome back</div>
      <div className={scss['sub-title']}>Please enter your details to sign in.</div>
      <Button
        fullWidth
        variant="bordered"
        className={scss.github}
        onPress={() =>
          (location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`)
        }>
        <Icon type="icon-github" />
        Sign in with GitHub
      </Button>
      <Divider className={scss.divider}>or use account sign in</Divider>
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
