import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

// 阻止事件冒泡
const stopPropagation = e => {
  e.stopPropagation();
};

const useStateHook = props => {
  const dispatch = useDispatch();

  // 读取文章详细内容
  const article = useSelector(state => (
    _.get(state, 'editor.articles')[props.work.article]
  ));

  // 移除
  const onClose = e => {
    stopPropagation(e);
    dispatch({
      article: article.id,
      type: 'editor/removeWork',
    });
  };

  return { article, onClose };
};

export default props => {
  const state = useStateHook(props);

  return (
    <span className={scss.tab}>
      {state.article.name}
      <Icon
        type="icon-guanbi6"
        className={classNames(
          scss['tab-icon'],
          { [scss['tab-icon-change']]: props.work.change }
        )}
        onClick={state.onClose}
      />
    </span>
  );
};
