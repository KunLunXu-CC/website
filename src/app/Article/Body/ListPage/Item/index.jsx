import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import { Image, Icon } from 'qyrc';
import { useObserver } from 'mobx-react-lite';
import classNames from 'classnames';
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
      <div className={classNames(scss.item, scss[props.align || 'left'])}>
        <div className={scss.detail}>
          <div className={scss.time}>
            <Icon type="icon-48copy11" />
            发布于 2019-06-04
          </div>
          <div className={scss.title}>
            PIL 合并 RGB 通道图与 Alpha 通道图
          </div>
          <div className={scss.info}>
            <div className={scss['info-item']}>
              <Icon type="icon-liulanliang" /> 5,411 热度
            </div>
            <div className={scss['info-item']}>
              <Icon type="icon-pinglunliang" /> 25 条评论
            </div>
            <div className={scss['info-item']}>
              <Icon type="icon-biaoqian" /> 野生技术协会
            </div>
          </div>
          <div className={scss.desc}>
            <p>
              明日方舟拆包以后发现立绘被分成了两张图，一个储存的是 RGB 通道的信息，另一个储存的是 Alpha 通道的信息
              明日方舟拆包以后发现立绘被分成了两张图，一个储存的是 RGB 通道的信息，另一个储存的是 Alpha 通道的信息
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
  });
};
