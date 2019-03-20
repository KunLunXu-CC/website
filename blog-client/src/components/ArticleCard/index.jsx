import React, { useMemo, createRef, useEffect, useState, useCallback } from 'react';
import style from './index.scss';
import { FontIcon } from '@components';
import imgData from '@assets/img/wallhaven-672007-1-1024x576.png';

const useStateHook = (props) => {
  const [imgStyle, setImgStyle] = useState({});
  const [cardClassName, setCardClassName] = useState(style['article-card']);

  const imgRef = useMemo(createRef, []);
  const thumbRef = useMemo(createRef, []);

  const flexDirection = useMemo(() => {
    const mapThumbPosition = { right: 'row', left: 'row-reverse' };
    return mapThumbPosition[props.thumbPosition];
  }, []);

  const resetImgStyle = useCallback(() => {
    const imgScale = imgRef.current.height / imgRef.current.width;
    const thumbScale = thumbRef.current.offsetHeight / thumbRef.current.offsetWidth;
    setImgStyle( thumbScale < imgScale ? { width: '100%' } : {height: '100%'} );
  }, []);

  const onMouseEnter = useCallback(() => {
    setCardClassName(`${style['article-card']} ${style['article-card-hover']}`);
  }, []);

  const onMouseLeave = useCallback(() => {
    setCardClassName(style['article-card']);
  }, []);

  return { flexDirection, imgRef, thumbRef, imgStyle, resetImgStyle, onMouseEnter, onMouseLeave, cardClassName }
}

export const ArticleCard = (props) => {
  const stateHook = useStateHook(props);
  return (
    <div style={{padding: '100px'}}>

      <div
        className={stateHook.cardClassName} 
        onMouseEnter={stateHook.onMouseEnter}
        onMouseLeave={stateHook.onMouseLeave}
        style={{ flexDirection: stateHook.flexDirection }}
      >
        <div className={style['article-card-info']}>
          <div className={style['article-card-info-time']}>
            <FontIcon 
              size="15px"
              icon="icon-48copy11"
              label="发布于 23 天前" 
              labelStyle={{fontSize: '14px'}}
            />
          </div>
          <div className={style['article-card-info-title']}>
            修复 WordPress 5.1 评论回复按键
          </div>
          <div className={style['article-card-info-stats']}>
            <FontIcon 
              size="15px"
              icon="icon-liulanliang"
              label="955"
              iconStyle={{paddingRight: '10px'}}
              labelStyle={{fontSize: '14px'}}
            />
            <FontIcon 
              size="15px"
              icon="icon-dianzanliang"
              label="30" 
              iconStyle={{paddingRight: '10px'}}
              labelStyle={{fontSize: '14px'}}
            />
            <FontIcon 
              size="15px"
              icon="icon-pinglunliang"
              label="30" 
              iconStyle={{paddingRight: '10px'}}
              labelStyle={{fontSize: '14px'}}
            />
          </div>
          <div className={style['article-card-info-desc']}>
            今天早上闲着无聊点了一下 WordPress 更新按键，从 5.0.3 更新到了 5.1，没想到出现了评论回复按键失效的问题，瞬间懵
          </div>
          <div className={style['article-card-info-footer']}>
            <div className={style['article-card-info-footer-tags']}>
              <FontIcon 
                size="15px"
                icon="icon-biaoqian"
                label="野生技术协会" 
                labelStyle={{fontSize: '14px'}}
              /> 
            </div>
            <div className={style['article-card-info-footer-more']}>
              <FontIcon 
                size="15px"
                icon="icon-gengduo"
                labelStyle={{fontSize: '14px'}}
              /> 
            </div>
          </div>
        </div>
        <div ref={stateHook.thumbRef} className={style['article-card-thumb']}>
          <img 
            alt="缩略图"
            src={imgData} 
            ref={stateHook.imgRef} 
            style={stateHook.imgStyle} 
            onLoad={stateHook.resetImgStyle} 
          />
        </div>
      </div>

    </div>
  );
}

ArticleCard.defaultProps = {
  thumbPosition: 'right'
}
