import Menu from './Menu';
import Header from './Header';
import scss from './index.module.scss';

import { useMemo } from 'react';
import { MENUS } from './consts';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const { selectedMenuKey } = useSelector((state) => state.setting);

  // 获取 body 组件
  const Body = useMemo(() => MENUS.find(
    (v) => v.key === selectedMenuKey,
  ).component, [selectedMenuKey]);

  return { Body };
};

export default () => {
  const { Body } = useStateHook();

  return (
    <div className={scss.setting}>
      <Header />
      <div className={scss.main}>
        <Menu />
        <div className={scss.body}>
          <Body />
        </div>
      </div>
    </div>
  );
};
