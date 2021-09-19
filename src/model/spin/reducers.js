
/**
 * 开启加载: spin[code]
 * 1. reducer: action = { type: 'spin/openSpin' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.code 唯一 code
 * @return {Object} 更新后的状态
 */
export const openSpin = (state, { code }) => (
  code ? { ...state, [code]: true } : state
);

/**
 * 关闭加载: spin[code]
 * 1. reducer: action = { type: 'spin/closeSpin' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.code 唯一 code
 * @return {Object} 更新后的状态
 */
export const closeSpin = (state, { code }) => (
  code ? { ...state, [code]: false } : {}
);
