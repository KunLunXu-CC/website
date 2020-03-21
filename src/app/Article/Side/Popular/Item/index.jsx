import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Image } from 'qyrc';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = props => {
  const dispatch = useDispatch();

  // 点击
  const onClick = () => {
    dispatch({ type: 'article/setRead', read: { article: props.data } });
  };

  const thumbs = useSelector(state => _.get(state, 'photos.thumb'));

  // 获取图片
  const img = useMemo(() => {
    // 1. 数据中存在缩略图则直接返回
    if (props.data.thumb) {
      return props.data.thumb;
    }

    // 2. 获取随机缩略图
    const index = Math.floor(Math.random() * thumbs.length);
    return thumbs.length > 0
      ?  `${SERVICE_STATIC_IMAGE_URL}${thumbs[index].name}`
      : '';
  }, [props.data.thumb, thumbs]);

  return { img, onClick };
};

export default props => {
  const state = useStateHook(props);

  return (
    <Image
      height="100px"
      src={state.img}
      className={scss.item}
      onClick={state.onClick}>
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
};
