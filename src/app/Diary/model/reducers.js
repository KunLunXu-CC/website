/**
 * 设置菜单
 * 1. reducer: action = { type: 'diary/setMenu' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.menu 要替换的 menu 参数(日记列表数据)
 * @return {Object} 更新后的状态
 */
export const setMenu = (state, { menu }) => ({
  ... state,
  menu: {
    ... state.menu,
    ... menu,
  },
});

export const space = () => {};

/**
 * 设置日记
 * 1. reducer: action = { type: 'diary/setDiaries' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.diaries 要设置的日历列表
 * @return {Object} 更新后的状态
 */
export const setDiaries = (state, { diaries }) => ({
  ... state,
  diaries,
});
