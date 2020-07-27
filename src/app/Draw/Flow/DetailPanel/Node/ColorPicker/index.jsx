
import React from 'react';
import scss from './index.module.scss';

import { SketchPicker } from 'react-color';

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
          />
        </div> : null }
    </div>
  );
};
