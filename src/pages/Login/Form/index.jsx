import scss from './index.module.scss';

import { rsa } from '@utils';
import { useSelector } from 'react-redux';
import { Input, Form, Button } from 'antd';
import { useCallback, useMemo } from 'react';
import { Image, Icon } from '@kunlunxu/brick';
import { useNavigate } from 'react-router-dom';
import { SERVICE_STATIC_IMAGE_URL } from '@config/constants';
import { useGetPublicKeyQuery, useLoginMutation } from '@store/graphql';

export default () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { data: publicKeyQuery } = useGetPublicKeyQuery();

  const avatars = useSelector(
    (state) => state.photos?.avatar ?? [],
  );

  // 随机头像
  const avatar = useMemo(() => {
    const index = Math.floor(Math.random() * avatars.length);
    return avatars.length > 0
      ? `${SERVICE_STATIC_IMAGE_URL}${avatars[index].name}`
      : '';
  }, [avatars]);

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
      <div className={scss['login-avatar']} >
        <Image src={avatar} />
      </div>
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
