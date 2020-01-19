import React from 'react';
import scss from './index.module.scss';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { SPIN_CODE } from '@config/consts';

export default () => {
  const show = useSelector(
    state => _.get(state, `spin.${SPIN_CODE.APP_EDITOR}`)
  );

  return (
    show
      ? <Spin className={scss.spin} size="large"/>
      : null
  );
};
