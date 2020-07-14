
/**
 * 设置 menu
 * 1. reducer: action = { type: 'draw/setMenu' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.menu 待修改 menu 参数
 * @return {Object} 更新后的状态
 */
export const setMenu = (state, { menu }) => ({
  ... state,
  menu: {
    ... state.menu,
    ... menu,
  },
});

export const space = {};
