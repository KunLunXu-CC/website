import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { use } from '@server';

/**
 *  hook 状态的分离
 * - 拦截 axios 请求和响应， 监听请求响应次数判断是否需要显示加载中组件
 */
const useSpinHook = () => {
  const [spinning, setSpinning] = useState(false);
  let count = 0;
  useEffect(() => {
    use({
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
  }, []);
  return { spinning };
}

export default (props) => {
  const store = useSpinHook();
  return (
    <Spin spinning={store.spinning}>
      {props.children}
    </Spin>
  );
}
