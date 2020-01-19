
/**
 * 设置 tags
 * 1. reducer: action = { type: 'editor/setTags' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.tags 需要修改的 tags
 * @return {Object} 更新后的状态
 */
export const setTags = (state, { tags }) => ({
  ... state,
  tags,
});

/**
 * 设置 articles
 * 1. reducer: action = { type: 'editor/setArticles' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.articles 需要修改的 articles
 * @return {Object} 更新后的状态
 */
export const setArticles = (state, { articles }) => ({
  ... state,
  articles,
});

/**
 * 设置 menu
 * 1. reducer: action = { type: 'editor/setMenu' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.menu 需要修改字段
 * @return {Object} 更新后的状态
 */
export const setMenu = (state, { menu }) => ({
  ... state,
  menu: { ... state.menu, ... menu },
});

/**
 * 添加 openList
 * 1. reducer: action = { type: 'editor/addOpenList' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.key 需要修改字段
 * @return {Object} 更新后的状态
 */
export const addOpenList = (state, { key }) => ({
  ... state,
  openList: [... state.openList, key],
});

/**
 * 移除 openList
 * 1. reducer: action = { type: 'editor/addOpenList' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.key 需要修改字段
 * @return {Object} 更新后的状态
 */
export const removeOpenList = (state, { key }) => ({
  ... state,
  openList: state.openList.filter(v => v !== key),
});

/**
 * 创建虚拟 tag (占位符)
 * 1. reducer: action = { type: 'editor/createFictitiousTag' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @return {Object} 更新后的状态
 */
export const createFictitiousTag = (state, { parent: { id, name } }) => ({
  ... state,
  tags: [
    {
      name: '',
      id: 'newTag',
      editor: true,
      parent: { id, name },
    },
    ... state.tags,
  ],
});

/**
 * 创建虚拟 article (占位符)
 * 1. reducer: action = { type: 'editor/createFictitiousArticle' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.parent 父级节点
 * @return {Object} 更新后的状态
 */
export const createFictitiousArticle = (state, { parent: { id, name } }) => ({
  ... state,
  articles: [
    {
      name: '',
      editor: true,
      id: 'newArticle',
      tags: [{ id, name }],
    },
    ... state.articles,
  ],
});

/**
 * 编辑文件夹: 找到数据设置 editor: true
 * 1. reducer: action = { type: 'editor/editorFolder' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.id 父级节点
 * @return {Object} 更新后的状态
 */
export const editorFolder = (state, { id }) => ({
  ... state,
  tags: state.tags.map(v => ({
    ... v,
    editor: v.id === id ? true : v.editor,
  })),
});


/**
 * 编辑文章: 找到数据设置 editor: true
 * 1. reducer: action = { type: 'editor/editorArticle' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.id 父级节点
 * @return {Object} 更新后的状态
 */
export const editorArticle = (state, { id }) => ({
  ... state,
  articles: state.articles.map(v => ({
    ... v,
    editor: v.id === id ? true : v.editor,
  })),
});
