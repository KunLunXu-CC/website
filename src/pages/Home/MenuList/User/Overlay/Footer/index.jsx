import React, {
  useCallback,
} from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useHistory } from 'react-router-dom';

const useStateHook = () => {
  const history = useHistory();

  // 退出
  const signOut = useCallback(() => {
    history.push('/login');
  }, []);

  return { signOut };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.footer}>
      <Icon type="icon-shezhi"/>
      <Icon type="icon-suoping"/>
      <Icon onClick={state.signOut} type="icon-tuichu"/>
    </div>
  );
};
