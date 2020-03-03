import React, {
  Fragment,
} from 'react';
import scss from './index.module.scss';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { SPIN_CODE, MESSAGE_CODE } from '@config/consts';

const useStateHook = () => {
  const showSpin = useSelector(
    state => _.get(state, `spin.${SPIN_CODE.APP_DIARY}`)
  );
  return { showSpin };
};

export default () => {
  const state = useStateHook();
  return (
    <Fragment>
      {state.showSpin
        ? <Spin className={scss.spin} size="large"/>
        : null}
      <div id={MESSAGE_CODE.APP_DIARY}/>
    </Fragment>
  );
};
