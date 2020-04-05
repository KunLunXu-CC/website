import React, {
  useMemo,
} from 'react';
import Menu from './Menu';
import Tips from './Tips';
import Stats from './Stats';
import Calendar from './Calendar';
import scss from './index.module.scss';

import { DIARY_MENU } from './consts';
import { useSelector } from 'react-redux';

// 菜单和组件的映射关系
const MEN_MAP_TO_COMPONENT_ = {
  [DIARY_MENU.STATS.VALUE]: Stats,
  [DIARY_MENU.CALENDAR.VALUE]: Calendar,
};

const useStateHook = () => {
  const { menu } = useSelector(state => state.diary);

  // 构建 body element
  const body = useMemo(() => {
    const Body = MEN_MAP_TO_COMPONENT_[menu.selectedKey];
    return (Body ? <Body /> : null);
  }, [menu.selectedKey]);

  return { body };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.layout}>
      <div className={scss['layout-menu']}>
        <Menu/>
      </div>
      <div className={scss['layout-body']}>
        {state.body}
      </div>
      <Tips/>
    </div>
  );
};
