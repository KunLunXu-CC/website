import _ from 'lodash';
import apps from '@app';

/**
 * 设置 app.docks
 * 1. reducer: action = { type: 'app/setDocks' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.auth 当前用户权限, 通过权限过滤出 docks
 * @return {Object} 更新后的状态
 */
export const setDocks = (state, { auth }) => {
  const docks = auth.map(v => {
    const { code, name } = apps[v.code] || {};
    return { code, name };
  }).filter(v => v.code && v.name);

  return { ... state, docks };
};

/**
 * 关闭应用
 * 1. reducer: action = { type: 'app/onClose' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.app 当前需要关闭的应用 { code, name }
 * @return {Object} 更新后的状态
 */
export const onClose = (state, { app }) => ({
  ... state,
  opens: state.opens.filter(v => v.code !== app.code),
});

/**
 * 最小化应用切换
 * 1. reducer: action = { type: 'app/onMin' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.app 当前需要切换的应用 { code, name }
 * @return {Object} 更新后的状态
 */
export const onMin = (state, { app }) => ({
  ... state,
  opens: state.opens.map(v => ({
    ... v,
    isMin: v.code === app.code ? !v.isMin : v.isMin,
  })),
});

/**
 * 最大化应用切换
 * 1. reducer: action = { type: 'app/onMax' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.app 当前需要切换的应用 { code, name }
 * @return {Object} 更新后的状态
 */
export const onMax = (state, { app }) => ({
  ... state,
  opens: state.opens.map(v => ({
    ... v,
    isMax: v.code === app.code ? !v.isMax : v.isMax,
  })),
});

/**
 * 开启应用, 已开启应用则调用 onMin 方法
 * 1. reducer: action = { type: 'app/openApp' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.app 当前打开的应用 { code, name }
 * @return {Object} 更新后的状态
 */
export const openApp = (state, { app }) => {
  const current = state.opens.find(v => (v.code === app.code));

  return current
    ? onMin(state, { app })
    : {
      ... state,
      opens: [... state.opens, { ... app, isMin: false, isMax: false }],
    };
};

/**
 * 引用切换: 开启多个应用时, 点击下层应用将切换至顶层
 * 1. reducer: action = { type: 'app/onMouseDown' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.app 当前打开的应用 { code, name }
 * @return {Object} 更新后的状态
 */
export const onMouseDown = (state, { app }) => {
  if (state.opens[state.opens.length - 1].key === app.key) {
    return state;
  }
  return {
    ... state,
    opens: [
      ... state.opens,
      ... _.remove(state.opens, v => (v.code === app.code)),
    ],
  };
};
