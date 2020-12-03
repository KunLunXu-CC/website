import { LOCALSTORAGE_KEY } from '../consts';

/**
 * 设置配置
 * 1. reducer: action = { type: 'setting/setValue' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.menu 要替换的 menu 状态
 * @return {Object} 更新后的状态
 */
export const setValue = (state, { setting }) => {
  const newState = { ... state, ... setting };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newState));
  return newState;
};

export const space = {};
