/**
 * 字体图标组件简单封装
 * @param {String}    props.icon        字体图标名( #icon-editor )
 * @param {String}    props.color       字体图标颜色（red）
 * @param {String}    props.size        字体图标大小（15px）
 * @param {Function}  props.onClick     字体图标点击事件
 * @param {String}    props.className   附加 className
 */
import React, { useMemo } from 'react';
export const FontIcon = (props) => {
  // 样式
  const styles = useMemo(() => {
    const _styles = {};
    props.size && (_styles.fontSize = props.size);
    props.color && (_styles.color = props.color);
    return _styles;
  });

  return (
    <span onClick={props.onClick || null}>
      <svg 
        style={styles}
        aria-hidden="true"
        
        className={`iconfont ${props.className || ''}`} 
      >
        <use xlinkHref={props.icon} ></use>
      </svg>

      ssss
    </span>
  );
}
