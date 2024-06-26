import classNames from 'classnames';
import scss from './index.module.scss';

import { actions } from '@store';
import { useCallback } from 'react';
import { Icon } from '@kunlunxu/brick';
import { ACTIVITY_LIST } from '@app/Editor/constants';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();

  const { selectKey } = useSelector((state) => ({
    selectKey: state.editor.activity.selectKey,
  }));

  // 点击菜单
  const handleClick = useCallback((selectKey) => {
    dispatch(actions.editor.setActivity({ selectKey }));
  }, [dispatch]);

  // 菜单项 className
  const getItemClassName = useCallback((key) => classNames(
    scss['activity-item'],
    { [scss['activity-item-active']]: key === selectKey },
  ), [selectKey]);

  return (
    <div className={scss.activity}>
      {ACTIVITY_LIST.map((v) => (
        <div
          key={v.key}
          className={getItemClassName(v.key)}
          onClick={handleClick.bind(null, v.key)}>
          <Icon type={v.icon} />
        </div>
      ))}
    </div>
  );
};
