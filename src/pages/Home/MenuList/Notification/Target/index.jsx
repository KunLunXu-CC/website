import moment from 'moment';
import scss from './index.module.scss';

import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

// TODO：优化，是否可以放于浏览器进程中
const useStateHook = () => {
  const [date, setDate] = useState(moment());
  const setting = useSelector((state) => state.setting.menuBar);

  // 星期
  const week = useMemo(() => (
    setting.showWeek
      ? `周${['一', '二', '三', '四', '五', '六', '天'][date.weekday()]}`
      : ''
  ), [date.format('YYYY-MM-DD HH:mm:ss'), setting.showWeek]);

  // 当前时间
  const time = useMemo(
    () => date.format(setting.formatDate),
    [date.format('YYYY-MM-DD HH:mm:ss'), setting.formatDate],
  );

  useEffect(() => {
    let unmount = false;

    const resetDate = () => {
      if (unmount) {
        return false;
      }

      setDate(moment());
      requestAnimationFrame(resetDate);
    };

    resetDate();
    return () => (unmount = true);
  }, []);

  return { week, time };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <div
      className={scss.wrapper}
      {... props}>
      <div className={scss.week}>
        {state.week}
      </div>
      <div className={scss.time}>
        {state.time}
      </div>
    </div>
  );
};
