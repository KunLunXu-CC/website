import useFullscreen from '@/hooks/useFullscreen';

import { Icon } from '@kunlunxu/brick';
import { useSelector } from 'react-redux';

export default () => {
  const { onToggle, fulled } = useFullscreen(document.body);
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
