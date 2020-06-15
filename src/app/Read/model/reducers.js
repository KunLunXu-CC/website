/**
 * 设置菜单(一级菜单)
 * 1. reducer: action = { type: 'read/setMenu' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.menu 待修改菜单
 * @return {Object} 更新后的状态
 */
export const setMenu = (state, { menu }) => ({
  ... state,
  menu: { ... state.menu, ... menu },
});

/**
 * 设备编辑框数据
 * 1. reducer: action = { type: 'read/setEditor' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} editor 需要修改的数据
 * @return {Object} 更新后的状态
 */
export const setEditor = (state, { editor }) => ({
  ... state,
  editor: {
    ... state.editor,
    ... editor,
  },
});
