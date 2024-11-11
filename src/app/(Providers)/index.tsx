'use client';
import Antd from './Antd';
import NextUI from './NextUI';
import ReactQuery from './ReactQuery';
import GlobalSetting from './GlobalSetting';
import { FC, ReactNode } from 'react';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <GlobalSetting>
      <Antd>
        <NextUI>
          <ReactQuery>{children}</ReactQuery>
        </NextUI>
      </Antd>
    </GlobalSetting>
  );
};

export default Providers;
