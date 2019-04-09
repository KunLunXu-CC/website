import _ from 'lodash';

const defaultState = {
  isMouseDown: false,
  styleParams: {
    width: 100, 
    height: 100, 
    left: 10, 
    top: 10,
    cursor: 'auto', 
  }
};

export const reckonCursor = ({ current, left, right, top, bottom }) => {
  const limit = 4;
  const dragLimit = 30;
  const map = {
    'pointer':  left > limit && right > limit && top > limit && top < dragLimit,  // 拖动                                               // 拖拽
    'w-resize': left < limit && top > limit && bottom > limit,                    // 向左
    'e-resize': right < limit && top > limit && bottom > limit,                   // 向右
    'n-resize': top < limit && left > limit && right > limit,                     // 向上
    's-resize': bottom < limit && left > limit && right > limit,                  // 向下
    'nw-resize': left < limit && top < limit,                                     // 左上
    'ne-resize': right < limit && top < limit,                                    // 右上
    'sw-resize': left < limit && bottom < limit,                                  // 左下
    'se-resize': right < limit && bottom < limit,                                 // 右下
  };
  const cursor = _.findKey(map, v => (v)) || defaultState.styleParams.cursor;
  return (cursor === current ? void 0 : cursor );
}

const hValue = ({current, move, min, max}) => {
  console.log('--------------');
  console.log(current, move, min, max);
  // 1. 默认值
  let value = current + move;
  // 2. 最值验证
  if (_.isNumber(min) && value < min){ 
    value = min;
  } else if(_.isNumber(max) && value > max){
    value = max;
  }
  // 3.返回值 
  return {value, offset: Math.abs(current - value)}
}

export const reckonStyleParams = ({ offset, width, height, top, left, movex, movey, maxW, maxH }) => {
  const wResize = () => {
    let hLeft = hValue({ current: left, move: movex, min: 0});
    let hWidth = hValue({ current: width, move: -movex, min: 50});
    if (hWidth.offset !== hLeft.offset){
      const newMovex = Math.min(hWidth.offset, hLeft.offset) * Math.sign(movex);
      hWidth = hValue({ current: width, move: -newMovex, min: 50});
      hLeft = hValue({ current: left, move: newMovex, min: 0});
    }
    return { width: hWidth.value, left: hLeft.value }
  };
  
  const eResize = () => {
    const max = maxW ? maxW - left : void 0;
    const hWidth = hValue({ current: width, move: movex, min: 50, max });
    return { width: hWidth.value }
  };

  const nResize = () => {
    let hHeight = hValue({ current: height, move: -movey, min: 50 });
    let hTop = hValue({ current: top, move: movey, min: 0 });

    if (hHeight.offset !== hTop.offset){
      const newMovex = Math.min(hHeight.offset, hTop.offset) * Math.sign(movey);
      hHeight = hValue({ current: height, move: -newMovex, min: 50});
      hTop = hValue({ current: top, move: newMovex, min: 0 });
    }

    return { height: hHeight.value, top: hTop.value }
  };

  const sResize = () => {
    const max = maxH ? maxH - top : void 0;
    const hHeight = hValue({ current: height, move: movey, min: 50, max });
    return { height: hHeight.value }
  };

  const pointer = () => {
    // offset.left
    const maxL = maxW ? maxW - offset.left : void 0;
    const hLeft = hValue({ current: left, move: movex, min: -offset.left, max: maxL});

    // const hTop = hValue({ current: top, move: movey});
    return {left: hLeft.value}
  };

  return {
    'w-resize': wResize(),                      // 向左
    'e-resize': eResize(),                      // 向右
    'n-resize': nResize(),                      // 向上
    's-resize': sResize(),                      // 向下
    'nw-resize': {...nResize(), ...wResize()},  // 左上
    'ne-resize': {...nResize(), ...eResize()},  // 右上
    'sw-resize': {...sResize(), ...wResize()},  // 左下
    'se-resize': {...sResize(), ...eResize()},  // 右下
    'pointer': pointer(),                       // 拖动
  };
}

export const reckonOffset = ({e, width, height}) => {
  const rect = e.target.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  return {
    top: offsetY,
    left: offsetX,
    right: width - offsetX,
    bottom: height - offsetY,
  };
};

export const reckonStyle = ({width, height, left, top, cursor }) => ({
  cursor,
  width: `${width}px`,
  height: `${height}px`,
  transform: `translate(${left}px, ${top}px)`,

  background: 'blue',
});

export const getParentInfo = ({ref}) => {
  if (!ref && !ref.current){return {};}
  const parent = ref.current.parentNode;
  return {
    clientWidth: parent.clientWidth,
    clientHeight: parent.clientHeight,
  };
}
