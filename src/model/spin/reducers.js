
/**
 * 开启加载: photos.spinning[code]
 * 1. reducer: action = { type: 'photos/openSpin' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.code 唯一 code
 * @return {Object} 更新后的状态
 */
export const openSpin = (state, { code }) => (
  code ? {
    ... state,
    spinning: {
      ... state.spinning,
      [code]: true,
    },
  } : state
);

/**
 * 关闭加载: photos.spinning[code]
 * 1. reducer: action = { type: 'photos/closeSpin' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.code 唯一 code
 * @return {Object} 更新后的状态
 */
export const closeSpin = (state, { code }) => (
  code ? {
    ... state,
    photos: {
      ... state.photos,
      spinning: { ... state.spinning, [code]: false },
    },
  } : {
    ... state,
    photos: {
      ... state.photos,
      spinning: { },
    },
  }
);

/**
 * 开启弹窗: photos.modals[code]
 * 1. reducer: action = { type: 'photos/openModal' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.code 唯一 code
 * @param {Object} action.rest 弹窗数据
 * @return {Object} 更新后的状态
 */
export const openModal = (state, { type, code, ... rest }) => (
  code ? {
    ... state,
    photos: {
      ... state.photos,
      modals: { ... state.modals, [code]: rest },
    },
  } : state
);

/**
 * 关闭弹窗: photos.modals[code]
 * 1. reducer: action = { type: 'photos/closeModal' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.code 唯一 code
 * @param {Object} action.rest 弹窗数据
 * @return {Object} 更新后的状态
 */
export const closeModal = (state, { code }) => {
  if (!code) {
    return state;
  }
  const modals = { ... state.photos.modals };
  delete modals[code];
  return {
    ... state,
    photos: {
      ... state.photos,
      modals,
    }
  };
};
