import useFullscreen from '@/hooks/useFullscreen';

import { Icon } from '@kunlunxu/brick';
import { useSelector } from 'react-redux';

const Fullscreen =  () => {
  const { onToggle, fulled } = useFullscreen();
  const setting = useSelector((state) => state.setting.menuBar);

  if (!setting.showFullScreenOnMenu) {
    return null;
  }

  return (
    <Icon
      onClick={onToggle}
      type={fulled ? 'icon-compress' :  'icon-shipinquanping'}
    />
  );
};

export default Fullscreen;
