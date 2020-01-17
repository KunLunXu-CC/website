import React, {
  useMemo,
} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Image, Icon } from 'qyrc';
import { formatNum } from '@utils';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = props => {
  const dispatch = useDispatch();

  // 点击
  const onClick = () => {
    // dispatch({ type: 'read', id });
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
      ? _.get(thumbs, `[${index}].url`, '')
      : '';
  }, [props.data.thumb, thumbs]);

  return { img, onClick };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div
      onClick={state.onClick}
      className={classNames(scss.item, scss[props.align || 'left'])}>
      <div className={scss.detail}>
        <div className={scss.time}>
          <Icon type="icon-48copy11" />
          更新于&nbsp;
          {moment(_.get(props, 'data.updateTime')).format('YYYY-MM-DD')}
        </div>
        <div className={scss.title}>
          {_.get(props, 'data.name', '---')}
        </div>
        <div className={scss.info}>
          <div className={scss['info-item']}>
            <Icon type="icon-liulanliang" />
            {formatNum(_.get(props, 'data.viewCount', 0))} 热度
          </div>
          <div className={scss['info-item']}>
            <Icon type="icon-pinglunliang" /> 25 条评论
          </div>
          <div className={scss['info-item']}>
            <Icon type="icon-biaoqian" />
            {_.get(props, 'data.tags[0].name', '---')}
          </div>
        </div>
        <div className={scss.desc}>
          <p>
            {_.get(props, 'data.desc') || _.get(props, 'data.content')}
          </p>
        </div>
        <div className={scss.entry}>
          <Icon type="icon-gengduo" />
        </div>
      </div>
      <div className={scss.bg}>
        <Image src={state.img}/>
      </div>
    </div>
  );
};
