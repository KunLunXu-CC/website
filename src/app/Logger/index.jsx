import React from 'react';
import scss from './index.module.scss';
import ws from '@utils/ws';

const wss = ws('/ws/logger');

const useStateHook = () => {
  const [logger, setLogger] = React.useState([]);

  React.useEffect(() => {
    const tmp = [];
    wss.onmessage = event => {
      tmp.push(JSON.parse(event.data));
      setLogger([... tmp]);
    };
  }, []);

  return { logger };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.logger}>
      <div className={scss.main}>
        {state.logger.map(((v, index) => (
          <pre key={index}> {v.message}</pre>
        )))}
      </div>
    </div>
  );
};
