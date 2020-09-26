import React from 'react';
import Date from './Date';
import Github from './Github';
import Juejin from './Juejin';
import classNames from 'classnames';
import Fullscreen from './Fullscreen';
import scss from './index.module.scss';
import Notification from './Notification';

import { Icon } from 'qyrc';
import { useSelector }  from 'react-redux';

const useStateHook = () => {
  const opens = useSelector(state => _.get(state, 'app.opens'));

  // 菜单 className
  const menuClassName = React.useMemo(() => {
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
        <Github/>
        <Juejin/>
        <Icon type="icon-wifi"/>
        <Icon type="icon-dianliang"/>
        <Fullscreen/>
        <Date/>
        <Notification/>
      </div>
    </div>
  );
};
