import { actions } from '@/store';
import { MENU_OPTIONS } from './constants';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from  'classnames';
import scss from './index.module.scss';

export default () => {
  const dispatch = useDispatch();
  const { activeMenuKey } = useSelector((state) => state.monitoring.menu);

  const { body: Body, bottomBtn: BottomBtn, bg } = useMemo(
    () => MENU_OPTIONS.find((v) => v.key === activeMenuKey),
    [activeMenuKey],
  );

  const handleChangeMenu = useCallback((key) => {
    dispatch(actions.monitoring.setActiveMenuKey(key));
  }, [dispatch]);

  return  (
    <div className={scss.logger}>
      {/* 左侧菜单 */}
      <div
        className={scss.side}
        style={{ background: bg.side }}>
        {MENU_OPTIONS.map((v) => (
          <div
            key={v.key}
            className={classNames(scss['menu-item'], {
              [scss['active-mene']]: v.key === activeMenuKey,
            })}
            onClick={handleChangeMenu.bind(null, v.key)}>
            {v.title}
          </div>
        ))}
      </div>

      {/* 右侧内容 */}
      <div
        className={scss.body}
        style={{ background: bg.body }}>
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
