import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 关闭
  const onClose = React.useCallback(() => {
    dispatch({ type: 'reader/closeArticle' });
  }, []);

  return { onClose };
};

export default props => {
  const state = useStateHook();

  return (
    <div className={scss.header}>
      <div className={scss.title}>{props.article?.name}</div>
      <div className={scss.tools}>
        <Icon type="icon-guanbi6" onClick={state.onClose}/>
      </div>
    </div>
  );
};
