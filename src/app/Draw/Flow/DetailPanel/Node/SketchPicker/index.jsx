
import React from 'react';
import scss from './index.module.scss';

import { SketchPicker } from 'react-color';

const useStateHook = () => {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  const [color, setColor] = React.useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = color => {
    setColor(color.rgb);
  };

  const styles = React.useMemo(() => ({
    'default': {
      color: {
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
    },
  }), [color]);

  return {
    color,
    styles,
    displayColorPicker,
    handleClick,
    handleClose,
    handleChange,
  };
};

export default () => {
  const state = useStateHook();
  return (
    <div>
      <div className={scss.swatch} onClick={state.handleClick}>
        <div style={state.styles} className={scss.color} />
      </div>
      { state.displayColorPicker ?
        <div className={scss.popover}>
          <div className={scss.cover} onClick={state.handleClose}/>
          <SketchPicker
            color={state.color}
            onChange={state.handleChange}
          />
        </div> : null }
    </div>
  );
};
