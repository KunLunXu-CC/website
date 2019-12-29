import React from 'react';
import { Spin } from 'antd';
import { useStore } from '../store';
import { useObserver } from 'mobx-react-lite';

import scss from './index.module.scss';

export default () => {
  const store = useStore();
  return useObserver(() => (
    store.spin.spinning
      ? <Spin className={scss.spin}/>
      : null
  ));
};
