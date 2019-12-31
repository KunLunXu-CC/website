import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Image } from 'qyrc';
import { useStore } from '../../../store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = (props, store) => {
  // 获取图片
  const img = useMemo(() => {
    // 1. 数据中存在缩略图则直接返回
    if (props.data.thumb) {
      return props.data.thumb;
    }
    // 2. 获取随机缩略图
    const index = Math.floor(Math.random() * store.article.thumbs.length);
    return store.article.thumbs.length > 0
      ? _.get(store.article.thumbs, `[${index}].url`, '')
      : '';
  }, [props.data.thumb, store.article.thumbs]);

  return { img };
};

export default props => {
  const store = useStore();
  return useObserver(() => {
    const state = useStateHook(props, store);
    return (
      <Image
        height="100px"
        src={state.img}
        className={scss.item}>
        <div className={scss.mask}>
          <div className={scss.tag}>
            {_.get(props, 'data.tags[0].name', '---')}
          </div>
          <div className={scss.title}>
            {_.get(props, 'data.name', '---')}
          </div>
        </div>
      </Image>
    );
  });
};
