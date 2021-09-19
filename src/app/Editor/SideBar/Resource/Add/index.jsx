import React from 'react';
import scss from './index.module.scss';

import { useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const onClick = React.useCallback(() => {
    dispatch({
      parent: null,
      type: 'editor/createTmpTag',
    });
  }, []);

  return { onClick };
};

export default () => {
  const state = useStateHook();
  return (
    <div
      onClick={state.onClick}
      className={scss.add}>
      +
    </div>
  );
};
