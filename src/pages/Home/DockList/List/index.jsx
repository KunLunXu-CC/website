import React, {
  useCallback,
} from 'react';
import { Icon } from 'qyrc';
import scss from './index.module.scss';

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
    <div className={scss.dock}>
      <div className={scss['dock-body']}>
        {props.dataSource.map((v, index) => (
          <div
            key={v.key || index}
            className={scss['dock-app']}
            onClick={state.onClick.bind(null, v)}>
            <div className={scss['dock-tooltip']}>{v.name}</div>
            <Icon type={v.icon} className={scss['dock-icon']}/>
          </div>
        ))}
      </div>
    </div>
  );
};
