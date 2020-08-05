
import React from 'react';
import scss from './index.module.scss';

import { SketchPicker } from 'react-color';

// 色块
const PRESET_COLORS = [
  '#ff4d4f', '#ff7a45', '#ffa940', '#ffc53d',
  '#ffec3d', '#bae637', '#73d13d', '#36cfc9',
  '#40a9ff', '#597ef7', '#9254de', '#f759ab',
  '#1d39c4', '#08979c', '#c41d7f', '#8c8c8c',
];

const useStateHook = props => {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  const [color, setColor] = React.useState(props.defaultColor);

  // 开启面板
  const onOpen = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  // 关闭面板
  const onClose = () => {
    setDisplayColorPicker(false);
  };

  // 修改颜色值
  const onChange = color => {
    setColor(color.hex);
    props.onChange && props.onChange(color.hex);
  };

  const styles = React.useMemo(() => ({
    background: color,
  }), [color]);

  return {
    color,
    styles,
    onOpen,
    onClose,
    onChange,
    displayColorPicker,
  };
};

export default props => {
  const state = useStateHook(props);
  return (
    <div className={scss.sketch}>
      <div
        style={state.styles}
        className={scss.color}
        onClick={state.onOpen}
      />
      { state.displayColorPicker ?
        <div className={scss.popover}>
          <div className={scss.cover} onClick={state.onClose}/>
          <SketchPicker
            color={state.color}
            onChange={state.onChange}
            presetColors={PRESET_COLORS}
          />
        </div> : null }
    </div>
  );
};
