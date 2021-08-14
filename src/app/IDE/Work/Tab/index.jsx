import React, {
  useMemo,
} from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = props => {
  const dispatch = useDispatch();

  // 读取文章详细内容
  const article = useSelector(state => (
    _.get(state, 'editor.articles')[props.work.article]
  ));

  // 移除: 点击小叉叉
  const onClose = e => {
    e.stopPropagation();
    dispatch({
      article: article.id,
      type: 'editor/removeWork',
    });
  };

  // icon className
  const iconClassName = useMemo(() => classNames(
    scss['tab-icon'],
    { [scss['tab-icon-change']]: props.work.change }
  ), [props.work.change]);

  return { article, onClose, iconClassName };
};

export default props => {
  const state = useStateHook(props);

  return (
    <span className={scss.tab}>
      {state.article.name}
      <Icon
        type="icon-guanbi6"
        onClick={state.onClose}
        className={state.iconClassName}
      />
    </span>
  );
};
