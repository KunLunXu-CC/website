import React from 'react';
import { Icon, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../store';
import scss from './index.module.scss';

export default () => {
  const store = useStore();

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
              <div key={v.id} className={scss[`level-${v.level}`]}>
                <div>{v.children}</div>
              </div>
            ))}
          </div>
        </Scroll>
      </div>
    );
  });
};


