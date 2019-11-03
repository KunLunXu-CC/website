import moment from 'moment';
import React, { useState, useEffect } from 'react';

import scss from './index.module.scss';

// TODO：优化，是否可以放于浏览器进程中
const useStateHook = () => {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    const cleard = setInterval(() => setDate(moment()), 1000);
    return clearImmediate.bind(null,cleard );
  }, []);

  return { date };
};

const DateZone = (props) => {
  const state = useStateHook(props);
  return (
    <div className={scss['dosktop-header-date']}>
      {state.date.format('YYYY:MM:DD hh:mm')}
    </div>
  );
};

export default DateZone;
