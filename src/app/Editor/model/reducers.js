
/**
 * 设置某个工作区
 * 1. reducer: action = { type: 'editor/setWork' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {object} state 当前 state
 * @param {string} action.article 文章 ID
 * @param {string} action.work 工作区需要修改的内容
 * @returns {object} 更新后的状态
 */
export const setWork = (state, { article, work }) => ({
  ...state,
  works: state.works.map((v) => (v.article === article
    ? { ...v, ...work }
    : v
  )),
});

/**
 * 设置 activity 状态
 * 1. reducer: action = { type: 'editor/setActivity', activity }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {object} state 当前 state
 * @param {object} action.activity 要修改 activity
 * @param action.activity.activity
 * @returns {object} 更新后的状态
 */
export const setActivity = (state, { activity }) => ({
  ...state,
  activity: { ...state.activity, ...activity },
});

/**
 * 设置 preview 状态
 * 1. reducer: action = { type: 'editor/setPreview', preview }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {object} state 当前 state
 * @param {object} action.preview 要修改 preview: article id
 * @param action.preview.preview
 * @returns {object} 更新后的状态
 */
export const setPreview = (state, { preview }) => {
  const { preview: prePreview } = state;
  return {
    ...state,
    preview: prePreview === preview ? void 0 : preview,
  };
};
