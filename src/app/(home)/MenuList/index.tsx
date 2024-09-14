import Github from './Github';
import Juejin from './Juejin';
import classNames from 'classnames';
import Fullscreen from './Fullscreen';
import scss from './index.module.scss';
import Notification from './Notification';

import { useMemo } from 'react';
import { Icon } from '@kunlunxu/brick';
import useAppStore from '@/store/useAppStore';

const MenuList = () => {
  const { opens } = useAppStore();

  // 菜单 className
  const menuClassName = useMemo(() => {
    const hideMenu = opens.find((v) => v.isMax && v.isMin === false);
    return classNames(scss.menu, { [scss['menu-auto-hiding']]: hideMenu });
  }, [opens]);

  return (
    <div className={menuClassName}>
      <div className={scss.body}>
        <Github />
        <Juejin />
        <Icon type="icon-wifi" />
        <Icon type="icon-dianliang" />
        <Fullscreen />
        <Notification />
      </div>
    </div>
  );
};

export default MenuList;
