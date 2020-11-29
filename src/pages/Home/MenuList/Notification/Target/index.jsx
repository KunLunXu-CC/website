import React from 'react';
import moment from 'moment';
import scss from './index.module.scss';

// TODO：优化，是否可以放于浏览器进程中
const useStateHook = () => {
  const [data, setData] = React.useState(null);

  // 获取日期
  const resetData = React.useCallback(() => {
    const time = moment().format('HH:mm:ss');
    const week = ['一', '二', '三', '四', '五', '六', '天'][moment().weekday()];
    setData({ week, time });
  }, []);

  React.useEffect(() => {
    resetData();
    const cleard = setInterval(resetData, 1000);
    return clearInterval.bind(null, cleard);
  }, [resetData]);

  return { data };
};

export default props => {
  const state = useStateHook(props);
  return (
    <div className={scss.wrapper} {... props}>
      <div className={scss.week}>
        周{_.get(state, 'data.week')}
      </div>
      <div className={scss.time}>
        {_.get(state, 'data.time')}
      </div>
    </div>
  );
};
