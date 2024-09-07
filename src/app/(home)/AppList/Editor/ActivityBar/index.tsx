import clsx from 'clsx';
import scss from './index.module.scss';
import useEditorStore from '../hooks/useActivityBarStore';

import { Icon } from '@kunlunxu/brick';
import { memo, useCallback } from 'react';
import { ACTIVITY_BAR_KEY } from '../types';
import { ACTIVITY_BAR_LIST } from '@/app/(home)/AppList/Editor/constants';

const ActivityBar = () => {
  const { selectedActivityBarKey, setSelectedActivityBarKey } = useEditorStore();

  // 点击菜单
  const handleClick = useCallback(
    (selectKey: ACTIVITY_BAR_KEY) => {
      setSelectedActivityBarKey(selectKey);
    },
    [setSelectedActivityBarKey],
  );

  return (
    <div className={scss.activity}>
      {ACTIVITY_BAR_LIST.map((v) => (
        <div
          key={v.key}
          className={clsx(scss['activity-item'], {
            [scss['activity-item-active']]: v.key === selectedActivityBarKey,
          })}
          onClick={handleClick.bind(null, v.key)}>
          <Icon type={v.icon} />
        </div>
      ))}
    </div>
  );
};

export default memo(ActivityBar);
