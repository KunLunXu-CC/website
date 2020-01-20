import React from 'react';
import scss from './index.module.scss';

import { Spin } from 'antd';
import { SPIN_CODE } from '@config/consts';
import { useSelector } from 'react-redux';

export default () => {
  const show = useSelector(
    state => _.get(state, `spin.${SPIN_CODE.APP_ARTICLE}`)
  );
  return (
    show
      ? <Spin className={scss.spin} size="large"/>
      : null
  );
};
