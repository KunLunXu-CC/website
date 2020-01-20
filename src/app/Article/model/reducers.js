import { TAG_ALL } from '@config/consts';
import { initState } from './index.model';

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

/**
 * 设置文章列表数据
 * 1. reducer: action = { type: 'article/setArticles', menus }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.articles 新的列表数据
 * @return {Object} 更新后的状态
 */
export const setArticles = (state, { articles }) => ({
  ... state,
  articles,
});

/**
 * 设置前十文章
 * 1. reducer: action = { type: 'article/setArticleTops', menus }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.articleTops 前十文章列表
 * @return {Object} 更新后的状态
 */
export const setArticleTops = (state, { articleTops }) => ({
  ... state,
  articleTops,
});

/**
 * 设置阅读状态(文章)
 * 1. reducer: action = { type: 'article/setRead', menus }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.read 要修改的 read 状态
 * @return {Object} 更新后的状态
 */
export const setRead = (state, { read }) => ({
  ... state,
  read: {
    ... state.read,
    ... read,
  },
});

/**
 * 清除阅读状态
 * 1. reducer: action = { type: 'article/clearRead', menus }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @return {Object} 更新后的状态
 */
export const clearRead = state => ({
  ... state,
  read: initState.read,
});
