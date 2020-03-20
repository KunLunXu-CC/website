import React, {
  Fragment,
} from 'react';
import scss from './index.module.scss';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { APP_CODE } from '@config/consts';

export default () => {
  const show = useSelector(
    state => _.get(state, `spin.${APP_CODE.EDITOR}`)
  );

  return (
    <Fragment>
      {show
        ? <Spin className={scss.spin} size="large"/>
        : null}
      <div id={APP_CODE.EDITOR}/>
    </Fragment>
  );
};
