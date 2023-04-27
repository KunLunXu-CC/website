import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MENU_OPTIONS } from './constants';

import classNames from  'classnames';
import scss from './index.module.scss';

export default () => {
  const { activeMenuKey } = useSelector((state) => state.monitoring.menu);

  const { body: Body, bottomBtn: BottomBtn } = useMemo(
    () => MENU_OPTIONS.find((v) => v.key === activeMenuKey),
    [activeMenuKey],
  );

  return  (
    <div className={scss.logger}>
      {/* 左侧菜单 */}
      <div className={scss.side}>
        {MENU_OPTIONS.map((v) => (
          <div
            key={v.key}
            className={classNames({
              [scss['active-mene']]: v.key === activeMenuKey,
            })}>
            {v.title}
          </div>
        ))}
      </div>

      {/* 右侧内容 */}
      <div className={scss.body}>
        {/* <Role /> */}
        <Body />
      </div>

      {/* 底部按钮 */}
      {BottomBtn ? (
        <div className={scss.button}>
          <BottomBtn />
        </div>
      ) : null}
    </div>
  );
};
