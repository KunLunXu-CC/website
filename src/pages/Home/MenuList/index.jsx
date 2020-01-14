import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import Date from './Date';
import User from './User';
import Github from './Github';
import Juejin from './Juejin';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useSelector }  from 'react-redux';

const useStateHook = () => {
  const opens = useSelector(state => _.get(state, 'app.opens'));
  const menuClassName = useMemo(() => {
    const hideMenu = opens.find(v => v.isMax && v.isMin === false);
    return classNames(
      scss.menu,
      { [scss['menu-auto-hiding']]: hideMenu },
    );
  }, [opens]);

  return { menuClassName };
};

export default () => {
  const state = useStateHook();
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
};
