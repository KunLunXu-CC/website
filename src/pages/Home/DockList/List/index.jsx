import React from 'react';
import apps from '@app';
import scss from './index.module.scss';
import styled from 'styled-components';
import { Icon } from 'qyrc';

const DockApp = styled.div`
  --margin: ${({ index, currentIndex }) => {
    const defaultValue = '10px';
    if (!_.isNumber(currentIndex)) {
      return defaultValue;
    }
    const mapIndex = 2 - Math.abs(currentIndex - index);
    return ['20px', '30px', '40px'] ?. [mapIndex] || defaultValue;
  }};

  --scale: ${({ index, currentIndex }) => {
    const defaultValue = 1;
    if (!_.isNumber(currentIndex)) {
      return defaultValue;
    }
    const mapIndex = 2 - Math.abs(currentIndex - index);
    return [1.3, 1.6, 1.9] ?. [mapIndex] || defaultValue;
  }};
`;

const useStateHook = props => {
  const [currentIndex, setCurrentIndex] = React.useState(null);

  // 点击事件
  const onClick = React.useCallback(dock => {
    _.isFunction(props.onClick) && props.onClick(dock);
  }, [props]);

  return { onClick, currentIndex, setCurrentIndex };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div className={`${scss.dock} ${scss['dock-auto-hiding']}`}>
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
            <Icon
              type={apps[v.code].icon}
              className={scss['dock-icon']}
            />
          </DockApp>
        ))}
      </div>
    </div>
  );
};
