import React, { useState, useEffect } from 'react';
import { Spin as AntdSpin } from 'antd';
import { use,　eject } from '@server';

/**
 *  hook 状态的分离
 * - 拦截 axios 请求和响应， 监听请求响应次数判断是否需要显示加载中组件
 */
const useSpinHook = () => {
  const [spinning, setSpinning] = useState(false);
  let count = 0;
  useEffect(() => {
    const interceptors = use({
      request: [(config) => {
        count += 1;
        !spinning && setSpinning(true);
        return config;
      }, (error) => (Promise.reject(error))],
      response: [(response) => {
        count -= 1;
        count === 0 && setSpinning(false);
        return response;
      }, (error) => (Promise.reject(error))]
    });
    return () => { eject(interceptors); }
  }, []);

  return { spinning };
}

export const Spin = (props) => {
  const store = useSpinHook();
  return (
    <AntdSpin spinning={store.spinning}>
      {props.children}
    </AntdSpin>
  );
}
