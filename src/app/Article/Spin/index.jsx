import React from 'react';
import { Spin } from 'antd';
import { useStore } from '../store';
import { SPIN_CODE } from '@config/consts';
import { useObserver } from 'mobx-react-lite';

import scss from './index.module.scss';

export default () => {
  const store = useStore();
  return useObserver(() => (
    store.global.spin.spinning[SPIN_CODE.APP_ARTICLE]
      ? <Spin className={scss.spin} size="large"/>
      : null
  ));
};
