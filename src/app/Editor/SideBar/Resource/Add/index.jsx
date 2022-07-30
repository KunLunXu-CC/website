import scss from './index.module.scss';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch({
      parent: null,
      type: 'editor/createTmpTag',
    });
  }, [dispatch]);

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
