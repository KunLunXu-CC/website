
/**
 * reducer: action = { type: 'global/getPhotos' }
 * 说明: 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} payload action.payload
 * @return {Object} 更新后的状态
 */
export const setUser = (state, { payload }) => ({
  ... state,
  ... payload,
});

export const place = () => {};
