/**
 * 开启弹窗: modal[code]
 * 1. reducer: action = { type: 'modal/openModal' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.code 唯一 code
 * @param {Object} action.rest 弹窗数据
 * @return {Object} 更新后的状态
 */
export const openModal = (state, { code, ... rest }) => {
  const data = { ... rest };
  delete data.type;
  return code ? { ... state, [code]: data } : state;
};

/**
 * 关闭弹窗: modal[code]
 * 1. reducer: action = { type: 'modal/closeModal' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.code 唯一 code
 * @param {Object} action.rest 弹窗数据
 * @return {Object} 更新后的状态
 */
export const closeModal = (state, { code }) => (
  code ? { ... state, [code]: void 0 } : state
);
