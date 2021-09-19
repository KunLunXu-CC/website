import React from 'react';
import Side from './Side';
import Detail from './Detail';
import Articles from './Articles';
import Recommend from './Recommend';
import scss from './index.module.scss';

import { DEFAULT_MENU } from './consts';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  // 菜单 selectedKey
  const selectedKey = useSelector((state) => state.reader.menu.selectedKey);

  // 获取 Body 组件
  const Body = React.useMemo(() => ({
    [DEFAULT_MENU.id]: Recommend,
  }[selectedKey] || Articles), [selectedKey]);

  return { Body };
};

export default () => {
  const { Body } = useStateHook();

  return (
    <div className={scss.reader}>
      <Side />
      <Body />
      <Detail />
    </div>
  );
};
