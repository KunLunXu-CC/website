import React from 'react';
import scss from './index.module.scss';

import { Icon, Scroll } from 'qyrc';
import { useStore } from '../../store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = store => {
  const onClick = item => {
    const title = document.getElementById(item.id);
    const parent = title.parentNode;
    const { top: titleTop } = title.getBoundingClientRect();
    const { top: parentTop } = parent.getBoundingClientRect();
    store.article.setScrollHeight(titleTop - parentTop);
  };

  return { onClick };
};

export default () => {
  const store = useStore();
  const state = useStateHook(store);

  return useObserver(() => {
    if (store.article.tocList.length < 1) {
      return null;
    }
    return (
      <div className={scss.wrapper}>
        <div className={scss.title}>
          <Icon type="icon-mulu" /> 目录
        </div>
        <Scroll className={scss.scroll}>
          <div className={scss.toc}>
            {store.article.tocList.map(v => (
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
    );
  });
};


