
'use client';
import Antd from './Antd'
import store from '@/store';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

const Providers: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Antd>
      <Provider store={store}>
        {children}
      </Provider>
    </Antd>
  );
}

export default Providers;
