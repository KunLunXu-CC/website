import React, {
  useCallback,
} from 'react';
import apps from '@app';
import scss from './index.module.scss';

import { Icon } from 'qyrc';

const useStateHook = props => {
  // 点击事件
  const onClick = useCallback(dock => {
    _.isFunction(props.onClick) && props.onClick(dock);
  }, [props]);

  return { onClick };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div className={`${scss.dock} ${scss['dock-auto-hiding']}`}>
      <div className={scss['dock-body']}>
        {props.dataSource.map((v, index) => (
          <div
            key={v.code || index}
            className={scss['dock-app']}
            onClick={state.onClick.bind(null, v)}>
            <div className={scss['dock-tooltip']}>
              {apps[v.code].name}
            </div>
            <Icon
              type={apps[v.code].icon}
              className={scss['dock-icon']}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
