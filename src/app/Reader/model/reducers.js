/**
 * 设置菜单
 * 1. reducer: action = { type: 'reader/setMenu' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.menu 要替换的 menu 状态
 * @return {Object} 更新后的状态
 */
export const setMenu = (state, { menu }) => ({
  ...state,
  menu: { ...state.menu, ...menu },
});

/**
 * 设置文章列表数据
 * 1. reducer: action = { type: 'reader/setArticles' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.articles 要修改数据(追加、替换)
 * @param {Boolean} [action.append = false] 是否是追加
 * @return {Object} 更新后的状态
 */
export const setArticles = (state, { articles, append = false }) => ({
  ...state,
  articles: [...(append ? articles : []), ...articles],
});

/**
 * 设置详情(打开、关闭)
 * 1. reducer: action = { type: 'reader/setDetail' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.detail 要修改数据
 * @return {Object} 更新后的状态
 */
export const setDetail = (state, { detail }) => ({
  ...state,
  detail: { ...state.detail, ...detail },
});
