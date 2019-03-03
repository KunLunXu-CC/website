import React, { useState, useEffect, useCallback } from 'react';
import { Spin as AntdSpin } from 'antd';
import { use,　eject } from '@server';

/**
 * 拦截 axios 请求和响应， 监听请求响应次数判断是否需要显示加载中组件
 */
const useSpinHook = () => {
  const [spinning, setSpinning] = useState(false);

  // 设置拦截器： 通过对请求进行计数， 来控制 spinning 状态
  const setInterceptors = () => {
    let count = 0;
    return use({
      request: [
        (config) => {
          count += 1;
          count === 1 && setSpinning( true );
          return config;
        }, 
        (error) => (Promise.reject(error))
      ],
      response: [
        (response) => {
          count -= 1;
          count === 0 &&  setSpinning(false);
          return response;
        }, 
        (error) => {
          count -= 1;
          count === 0 &&  setSpinning(false);
          return Promise.reject(error);
        }
      ]
    });
  };  

  useEffect(() => {
    const interceptors = setInterceptors();
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
