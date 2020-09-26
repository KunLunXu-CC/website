import React from 'react';

import { Icon } from 'qyrc';
import {
  isFullscreen,
  exitFullscreen,
  requestFullscreen,
} from '@utils/fullscreen';

const useStateHook = () => {
  const [fulled, setFulled] = React.useState(false);

  // 切换状态
  const onToggle = React.useCallback(() => {
    setFulled(!fulled);
  }, [fulled]);

  // 监听状态: 根据状态自动切换全屏、退出全屏
  React.useEffect(() => {
    isFullscreen() && exitFullscreen();
    fulled && requestFullscreen(document.getElementById('root'));
  }, [fulled]);

  return { fulled, onToggle };
};

export default props => {
  const state = useStateHook(props);
  return (
    <Icon
      onClick={state.onToggle}
      type={state.fulled ? 'icon-compress' :  'icon-shipinquanping'}
    />
  );
};
