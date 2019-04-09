
export const reckonCursor = ({ left, right, top, bottom, current }) => {
  const limit = 4;
  const map = {
    'w-resize': left < limit && top > limit && bottom > limit,    // 向左
    'e-resize': right < limit && top > limit && bottom > limit,   // 向右
    'n-resize': top < limit && left > limit && right > limit,     // 向上
    's-resize': bottom < limit && left > limit && right > limit,  // 向下
    'nw-resize': left < limit && top < limit,                     // 左上
    'ne-resize': right < limit && top < limit,                    // 右上
    'sw-resize': left < limit && bottom < limit,                  // 左下
    'se-resize': right < limit && bottom < limit,                 // 右下
  };
  const cursor = _.findKey(map, v => (v)) || defaultState.styleParams.cursor;
  return (cursor === current ? void 0 : cursor );
}

const hValue = ({current, move, min, max}) => {
  // 1. 默认值
  let value = current + move;
  let offset = move;
  // 2. 最值验证
  if (min && value < min){ 
    value = min;
  } else if(max && value > max){
    value = max;
  }
  // 3.返回值 
  return {value, offset}
}

export const reckonStyleParams = ({width, height, top, left, movex, movey}) => {
  const wResize = () => {
    // 1. 定义修改常量
    let reWidth = width - movex;
    let reLeft = left + movex;
    // 1. 获取 movex 
    if (  ){}

    let reWidth = width - movex < 50 ? 50 : width - movex;
    let reLeft = left + movex < 0 ? 0 : left + movex;
    
    if (reLeft === left || reWidth ===  width){return {};}
    console.log('111');
    return { width: reWidth, left: reLeft }
  };
  
  const eResize = () => {
    const reWidth = width + movex;
    if (reWidth < 50){return {}}
    return { width: reWidth }
  };
  const nResize = () => {
    const reHeight = height - movey;
    const reTop = top + movey;
    if (reTop < 0 || reHeight < 50){return {}}
    return { height: reHeight, top: reTop }
  };
  const sResize = () => {
    const reHeight = height - movey;
    if (reHeight < 50){return {}}
    return { height: height + movey }
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