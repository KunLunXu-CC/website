import { TAG_ALL } from '@config/consts';

/**
 * 设置菜单数据
 * 1. reducer: action = { type: 'article/setMenus', menus }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.menus 菜单数据
 * @return {Object} 更新后的状态
 */
export const setMenus = (state, { menus }) => ({
  ... state,
  menus: [TAG_ALL, ... menus],
});

/**
 * 设置搜索条件
 * 1. reducer: action = { type: 'article/setSearch', menus }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.search 需要修改的字段以及对应的值
 * @return {Object} 更新后的状态
 */
export const setSearch = (state, { search }) => ({
  ... state,
  search: {
    ... state.search,
    ... search,
  },
});
