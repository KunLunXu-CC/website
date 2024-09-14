'use client';
import Antd from './Antd';
import NextUI from './NextUI';
import ReactQuery from './ReactQuery';
import { FC, ReactNode } from 'react';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Antd>
      <NextUI>
        <ReactQuery>{children}</ReactQuery>
      </NextUI>
    </Antd>
  );
};

export default Providers;
