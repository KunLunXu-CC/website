/**
 * 字体图标组件简单封装
 * @param {String}    props.icon        字体图标名( icon-editor )
 * @param {String}    props.color       字体图标颜色（red）
 * @param {String}    props.size        字体图标大小（15px）
 * @param {Object}    props.iconStyle   字体图标样式
 * @param {Function}  props.onClick     字体图标点击事件
 * @param {String}    props.className   附加 className
 * @param {String}    props.label       label 文字
 * @param {Object}    props.labelStyle  label 样式
 */
import React, { useMemo } from 'react';
export default ({ size, color, iconStyle, onClick, className, icon, label, labelStyle }) => {
  // 样式
  const styles = useMemo(() => {
    const _styles = {...iconStyle};
    _styles.fontSize = size || '14px';
    _styles.color = color || void 0;
    return _styles;
  }, []);

  return (
      <span style={{ ...styles }} onClick={onClick || null} className={` ${className || ''}`} >
        <svg aria-hidden="true" className="iconfont">
          <use xlinkHref={`#${icon}`} ></use>
        </svg>
        {
          label ? 
          <span style={{padding: '0 5px', ...labelStyle}}>
            {label}
          </span> : null
        }
    </span>
  );
}
