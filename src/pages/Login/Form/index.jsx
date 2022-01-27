import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { rsa } from '@utils';
import { Image, Icon } from 'qyrc';
import { Input, Form, Button } from 'antd';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';
import { useHistory } from 'react-router-dom';
import { getPublicKey } from '@model/user/services';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const avatars = useSelector(
    (state) => state.photos?.avatar ?? [],
  );

  const history = useHistory();

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  // 公钥
  const publicKey = useMemo(async () => (
    await getPublicKey()
  ), []);

  // 随机头像
  const avatar = useMemo(() => {
    const index = Math.floor(Math.random() * avatars.length);
    return avatars.length > 0
      ? `${SERVICE_STATIC_IMAGE_URL}${avatars[index].name}`
      : '';
  }, [avatars]);

  // 登录
  const onLogin = async () => {
    const { account, password } = await form.validateFields();
    dispatch({
      account,
      type: 'user/login',
      password: rsa(password, await publicKey),
    });
    history.push('/');
  };

  return { onLogin, avatar, form };
};

export default (props) => {
  const state = useStateHook(props);

  return (
    <div className={scss.login}>
      <div className={scss['login-avatar']} >
        <Image src={state.avatar} />
      </div>
      <div className={scss['login-form']}>
        <Form form={state.form}>
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
              onClick={state.onLogin}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
