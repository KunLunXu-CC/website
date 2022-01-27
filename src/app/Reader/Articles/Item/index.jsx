import React from 'react';
import moment from 'moment';
import scss from './index.module.scss';

import { Image, Icon } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';

const useStateHook = (props) => {
  const dispatch = useDispatch();
  // 缩略图列表, 当文章未设置缩略图则需要从该列表中随机获取一张作为缩略图
  const thumbs = useSelector((state) => (
    state.photos?.thumb ?? []
  ));

  // 缩略图
  const thumb = React.useMemo(() => {
    if (props.data.thumb) {
      return props.data.thumb;
    }

    const index = Math.floor(Math.random() * thumbs.length);
    return thumbs.length > 0
      ? `${SERVICE_STATIC_IMAGE_URL}${thumbs[index].name}`
      : '';
  }, [props.data, thumbs]);

  // 打开
  const onOpen = React.useCallback(() => {
    dispatch({
      article: props.data,
      type: 'reader/openArticle',
    });
  }, [props.data]);

  return { thumb, onOpen };
};

/**
 * @param {Object} props.data 数据(文章)
 * @param {left | right} props.thumbPosition 缩略图位置
 */
export default (props) => {
  const state = useStateHook(props);
  console.log(props.data);
  return (
    <div
      onClick={state.onOpen}
      className={`${scss.item} ${scss[`thumb-${props.thumbPosition}`]}`}>
      <div className={scss.thumb}>
        <Image src={state.thumb} />
      </div>
      <div className={scss.body}>
        <div className={scss.time}>
          <Icon type="icon-48copy11" />
          发布于:
          {' '}
          {moment(props.data.updateTime).format('YYYY-MM-DD')}
        </div>
        <div className={scss.title}>
          {props.data.name}
        </div>
        <div className={scss.stats}>
          <Icon type="icon-liulanliang" />
          7,000热度&emsp;
          <Icon type="icon-pinglunliang" />
          26条评论&emsp;
          <Icon type="icon-biaoqian" />
          {props.data.tags?.[0].name}
&emsp;
        </div>
        <div className={scss.desc}>
          {/* 当我们需要用 GraphQL 查询多层套嵌的数据，比如像 WordPress 这样套嵌的评论信息时，通常的写法是 */}
        </div>
        <div className={scss.more}>
          ...
        </div>
      </div>
    </div>
  );
};
