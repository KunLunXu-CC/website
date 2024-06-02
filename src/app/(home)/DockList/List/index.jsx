import classNames from 'classnames';
import scss from './index.module.scss';
import styled from 'styled-components';
import apps from '@/app/(home)/AppList/config';

import { useSelector } from 'react-redux';
import { useState, useCallback, useMemo } from 'react';

const DockApp = styled.div`
  --scale: ${({ index, currentIndex }) => {
    const defaultValue = 1;

    if (!_.isNumber(currentIndex)) {
      return defaultValue;
    }

    const mapIndex = 2 - Math.abs(currentIndex - index);
    return [1.1, 1.2, 1.3]?.[mapIndex] || defaultValue;
  }};
`;

const useStateHook = (props) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const setting = useSelector((state) => state.setting.dock);

  // 点击事件
  const onClick = useCallback((dock) => {
    _.isFunction(props.onClick) && props.onClick(dock);
  }, [props]);

  // 最外层容器 className
  const className = useMemo(() => classNames(
    scss.dock,
    { [scss['dock-auto-hiding']]: setting.hideDock },
  ), [setting.hideDock]);

  return { onClick, currentIndex, setCurrentIndex, className };
};

const List = (props) => {
  const state = useStateHook(props);

  return (
    <div className={state.className}>
      <div
        className={scss['dock-body']}>
        {props.dataSource.map((v, index) => (
          <DockApp
            index={index}
            key={v.code || index}
            className={scss['dock-app']}
            currentIndex={state.currentIndex}
            onClick={state.onClick.bind(null, v)}
            onMouseLeave={state.setCurrentIndex.bind(null, null)}
            onMouseEnter={state.setCurrentIndex.bind(null, index)}>
            <div className={scss['dock-tooltip']}>
              {apps[v.code].name}
            </div>
            <img
              src={apps[v.code].icon}
              alt={apps[v.code].name}
              className={scss['dock-icon']}
            />
          </DockApp>
        ))}
      </div>
    </div>
  );
};

export default List;
