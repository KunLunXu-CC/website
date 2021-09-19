import React from 'react';
import useFullscreen from '@utils/useFullscreen';

import { Icon } from 'qyrc';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const { onToggle, fulled } = useFullscreen(document.body);
  const setting = useSelector((state) => state.setting.menuBar);

  return { fulled, onToggle, setting };
};

export default (props) => {
  const state = useStateHook(props);

  return state.setting.showFullScreenOnMenu ? (
    <Icon
      onClick={state.onToggle}
      type={state.fulled ? 'icon-compress' :  'icon-shipinquanping'}
    />
  ) : null;
};
