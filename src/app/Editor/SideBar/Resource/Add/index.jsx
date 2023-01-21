import scss from './index.module.scss';

import { actions } from '@store';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(actions.editor.createTmpTag(null));
  }, [dispatch]);

  return (
    <div
      className={scss.add}
      onClick={handleClick}>
      +
    </div>
  );
};
