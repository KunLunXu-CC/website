import React, {
  useMemo,
} from 'react';
import Date from './Date';
import User from './User';
import Github from './Github';
import Juejin from './Juejin';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useStore } from '@store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = store => {
  const menuClassName = useMemo(() => {
    const hideMenu = store.app.list.find(v => v.isMax && v.isMin === false);
    return classNames(
      scss.menu,
      { [scss['menu-auto-hiding']]: hideMenu },
    );
  }, [store.app.list]);

  return { menuClassName };
};

export default () => {
  const store = useStore();
  return useObserver(() => {
    const state = useStateHook(store);
    return (
      <div className={state.menuClassName}>
        <div className={scss.body}>
          <Date/>
          <Github/>
          <Juejin/>
          <Icon type="icon-wifi"/>
          <Icon type="icon-dianliang"/>
          <User/>
        </div>
      </div>
    );
  });
};
