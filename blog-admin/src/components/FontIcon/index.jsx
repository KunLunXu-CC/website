/**
 * 字体图标组件简单封装
 * @param {String}    props.icon        字体图标名(带 # 号)
 * @param {String}    props.color       字体图标样式
 * @param {String}    props.size        字体图标颜色
 * @param {Function}  props.onClick     字体图标点击事件
 * @param {String}    props.className   附加 className
 */
import React, { useMemo } from 'react';
export default (props) => {
  const styles = useMemo(() => {
    const _styles = {};
    props.size && (_styles.fontSize = props.size);
    props.color && (_styles.color = props.color);
    return _styles;
  });

  return (
    <svg 
      style={styles}
      aria-hidden="true"
      onClick={props.onClick}
      className={`iconfont ${props.className || ''}`} 
    >
      <use xlinkHref={props.icon} ></use>
    </svg>
  );
}
