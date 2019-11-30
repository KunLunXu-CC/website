import React from 'react';
import { Icon } from 'qyrc';
import { withRouter } from 'react-router-dom';

import scss from './index.module.scss';

const useStateHook = props => {
  // 退出
  const signOut = () => {
    console.log('退出');
    props.history.push('/login');
  };

  return { signOut };
};

export default withRouter(props => {
  const state = useStateHook(props);

  return (
    <div className={scss.footer}>
      <Icon type="icon-shezhi"/>
      <Icon type="icon-suoping"/>
      <Icon onClick={state.signOut} type="icon-tuichu"/>
    </div>
  );
});
