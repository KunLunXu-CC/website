import React from 'react';
import scss from './index.module.scss';

import { Icon, Scroll } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const read = useSelector(state => _.get(state, 'article.read'));

  const onClick = item => {
    const title = document.getElementById(item.id);
    const parent = title.parentNode;
    const { top: titleTop } = title.getBoundingClientRect();
    const { top: parentTop } = parent.getBoundingClientRect();

    dispatch({
      type: 'article/setRead',
      read: { scrollHeight: titleTop - parentTop },
    });
  };

  return { onClick, read };
};

export default () => {
  const state = useStateHook();
  return (
    state.read.toc.length > 0 ?
      <div className={scss.wrapper}>
        <div className={scss.title}>
          <Icon type="icon-mulu" /> 目录
        </div>
        <Scroll className={scss.scroll}>
          <div className={scss.toc}>
            {state.read.toc.map(v => (
              <div
                key={v.id}
                className={scss[`level-${v.level}`]}
                onClick={state.onClick.bind(null, v)}>
                <div>{v.children}</div>
              </div>
            ))}
          </div>
        </Scroll>
      </div>
      : null
  );
};


