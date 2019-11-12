import { Image, Icon } from 'qyrc';
import React from 'react';
import classNames from 'classnames';
import IMG from '@assets/img/74857125_p0.png';
import scss from './index.module.scss';

// const useStateHook = () => {

// };

export default props => (
  <div className={classNames(scss.item, scss[props.align || 'left'])}>
    <div className={scss.detail}>
      <div className={scss.detail}>
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
      <Image src={IMG}/>
    </div>
  </div>
);
