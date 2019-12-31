import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { useStore } from '@store';
import { Image, Icon } from 'qyrc';
import { withRouter } from 'react-router-dom';
import { Input, Form, Button, message } from 'antd';

const useStateHook = (props, store) => {
  // 随机头像
  const avatar = useMemo(() => {
    const index = Math.floor(Math.random() * store.avatar.list.length);
    return store.avatar.list.length > 0
      ? _.get(store.avatar.list, `[${index}].url`, '')
      : '';
  }, [store.avatar.list]);

  // 登录
  const onLogin = () => {
    props.form.validateFieldsAndScroll((errors, { account, password }) => {
      if (!!errors) {
        return false;
      }
      store.user.login({ account, password }).then(({ logined }) => {
        logined
          ? props.history.push('/')
          : message.warning('登录失败, 账号或密码错误！');
      });
    });
  };

  return { onLogin, avatar };
};

export default Form.create()(withRouter(props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return (
    <div className={scss.login}>
      <div className={scss['login-avatar']} >
        <Image src={state.avatar}/>
      </div>
      <div className={scss['login-form']}>
        <Form>
          <Form.Item>
            {props.form.getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input
                size="large"
                placeholder="请输入账号"
                prefix={<Icon type="icon-jenkins"/>}/>
            )}
          </Form.Item>
          <Form.Item>
            {props.form.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input.Password
                size="large"
                placeholder="请输入密码"
                prefix={<Icon type="icon-suoping"/>}/>
            )}
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
}));
