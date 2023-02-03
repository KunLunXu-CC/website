import scss from './progress.module.scss';
import { useMemo } from 'react';

const useStateHook = () => {
  // bar 样式
  const barStyle = useMemo(() => ({
    width: '80%',
    background: '#1890ff',
  }), []);

  return { barStyle };
};

export default (props) => {
  const state = useStateHook(props);

  return (
    <div className={scss.progress}>
      <div className={scss['progress-wrapper']}>
        <div
          style={state.barStyle}
          className={scss['progress-bar']}
        />
      </div>
      <div className={scss.detail}>
        280.2G / 2055G
      </div>
    </div>
  );
};
