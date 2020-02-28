import React, {
  useMemo,
} from 'react';
import Menu from './Menu';
import scss from './index.module.scss';
import Calendar from './Calendar';

import { useSelector } from 'react-redux';
import { DIARY_MENU } from '@config/consts';

// 菜单和组件的映射关系
const MEN_MAP_TO_COMPONENT_ = {
  [DIARY_MENU.CALENDAR.VALUE]: Calendar,
};

const useStateHook = () => {
  const { menu } = useSelector(state => state.diary);

  // 构建 body element
  const body = useMemo(() => {
    const Body = MEN_MAP_TO_COMPONENT_[menu.selectedKey];
    return (<Body />);
  }, [menu.selectedKey]);

  return { body };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.layout}>
      <Menu/>
      <div className={scss['layout-body']}>
        {state.body}
      </div>
    </div>
  );
};
