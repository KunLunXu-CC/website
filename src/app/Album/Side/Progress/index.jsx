import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

const useStateHook = () => {
  // bar 样式
  const barStyle = useMemo(() => ({
    width: '80%',
    background: '#1890ff',
  }), []);

  return { barStyle };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div className={scss.progress}>
      <div className={scss['progress-wrapper']}>
        <div className={scss['progress-bar']} style={state.barStyle} />
      </div>
      <div className={scss.detail}>280.2G / 2055G</div>
    </div>
  );
};
