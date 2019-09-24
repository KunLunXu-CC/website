import React from 'react';
import { Scroll } from 'qyrc';
import Title from './Title';
import ListPage from './ListPage';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['side']}>
      <Title />
      <Scroll className={scss['body-side']}>
        <ListPage />
      </Scroll>
    </div>
  );
}
