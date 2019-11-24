import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import { Image } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import scss from './index.module.scss';
import { useStore } from '../../../store';

const useStateHook = (props, store) => {
  // 获取图片
  const img = useMemo(() => {
    // 1. 数据中存在缩略图则直接返回
    if (props.data.img) {
      return props.data.img;
    }
    // 2. 获取随机缩略图
    const index = Math.floor(Math.random() * store.article.thumbs.length);
    return store.article.thumbs.length > 0
      ? _.get(store.article.thumbs, `[${index}].url`, '')
      : '';
  }, [props.data.img, store.article.thumbs]);

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
          <div className={scss.title}>
            PIXIV
          </div>
          <div className={scss.desc}>
            P 站的正确打开方式
          </div>
        </div>
      </Image>
    );
  });
};
