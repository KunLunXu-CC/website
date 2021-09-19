import React from 'react';
import scss from './index.module.scss';
import ws from '@utils/ws';

const useStateHook = () => {
  const [logger, setLogger] = React.useState([]);
  const mainRef = React.useRef();

  // 滚动带底部
  const onScrollEnd = React.useCallback(() => {
    if (!mainRef.current) {
      return false;
    }

    const { scrollHeight, clientHeight } = mainRef.current;
    mainRef.current.scrollTop = scrollHeight - clientHeight;
  }, [mainRef.current]);

  React.useEffect(() => {
    const wss = ws('/ws/logger');
    const tmp = [];
    onScrollEnd();

    wss.onmessage = (event) => {
      const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
      tmp.push(JSON.parse(event.data));
      setLogger([...tmp]);
      // 只有在滚动条位于底部时, 才在每次加载数据时自动滚动
      scrollTop + clientHeight === scrollHeight &&
      setTimeout(onScrollEnd, 1000);
    };

    return () => wss.close();
  }, []);

  return { logger, mainRef };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.logger}>
      <div
        ref={state.mainRef}
        className={scss.main}>
        {state.logger.map(((v, index) => (
          <pre key={index}>
            {' '}
            {v.message}
          </pre>
        )))}
      </div>
    </div>
  );
};
