import React from 'react';
import Menu from './Menu';
import scss from './index.module.scss';

import { MENU_LIST } from './consts';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const { activeKey } = useSelector(state => state.draw.menu);

  // 获取 Body 组件
  const Body = React.useMemo(() => (
    MENU_LIST.find(v => v.key === activeKey).body
  ), [activeKey]);

  return { Body };
};

export default () => {
  const { Body } = useStateHook();

  return (
    <div className={scss.draw}>
      <Menu/>
      <Body/>
    </div>
  );
};
