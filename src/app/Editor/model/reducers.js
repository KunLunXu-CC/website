
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
 * 创建临时 article (占位符)
 * 1. reducer: action = { type: 'editor/createTmpArticle' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {object} state 当前 state
 * @param {object} action.parent 父级节点
 * @param action.parent.tag
 * @returns {object} 更新后的状态
 */
export const createTmpArticle = (state, { tag }) => ({
  ...state,
  articles: {
    ...state.articles,
    new: {
      name: '',
      id: 'new',
      editor: true,
      tags: [{ id: tag }],
    },
  },
});

/**
 * 为 tag 添加编辑状态: 找到数据设置状态 editor = true
 * 1. reducer: action = { type: 'editor/addEditorStatusWithTag' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {object} state 当前 state
 * @param {object} action.id 要修改 tag id
 * @param action.id.id
 * @returns {object} 更新后的状态
 */
export const addEditorStatusWithTag = (state, { id }) => {
  const tags = { ...state.tags };
  tags[id].editor = true;
  return { ...state, tags };
};

/**
 * 为 article 添加编辑状态: 找到数据设置状态 editor = true
 * 1. reducer: action = { type: 'editor/addEditorStatusWithArticle' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {object} state 当前 state
 * @param {object} action.id 要修改 article id
 * @param action.id.id
 * @returns {object} 更新后的状态
 */
export const addEditorStatusWithArticle = (state, { id }) => {
  const articles = { ...state.articles };
  articles[id].editor = true;
  return { ...state, articles };
};

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
