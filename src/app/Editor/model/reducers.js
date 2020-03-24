
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
 * 设置 menu: 替换式修改
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
 * 插入工作窗口配置: works = [{ article, change: false }]
 * 1. reducer: action = { type: 'editor/appendWorks' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.article 文章 ID
 * @return {Object} 更新后的状态
 */
export const appendWorks = (state, { article }) => (
  state.works.find(v => v.article === article)
    ? {
      ... state,
      works: state.works.map(v => ({
        ... v,
        action: v.article === article,
      })),
    }
    : {
      ... state,
      works: [
        ... state.works.map(v => ({ ... v, action: false })),
        {
          article,
          action: true,
          change: false,
        },
      ],
    }
);

/**
 * 设置某个工作区
 * 1. reducer: action = { type: 'editor/setWork' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.article 文章 ID
 * @param {String} action.work 工作区需要修改的内容
 * @return {Object} 更新后的状态
 */
export const setWork = (state, { article, work }) => ({
  ... state,
  works: state.works.map(v => (v.article === article
    ? { ... v, ... work }
    : v
  )),
});

/**
 * 移除工作窗口: 没传 article 则移除所有
 * 1. reducer: action = { type: 'editor/removeWork' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.article 文章 ID
 * @return {Object} 更新后的状态
 */
export const removeWork = (state, { article }) => {
  const works =  article
    ? state.works.filter(v => v.article !== article)
    : [];
  const hasAction = works.find(v => v.action);

  if (!hasAction && works.length > 0) {
    works[works.length - 1].action = true;
  }

  return { ... state, works };
};

/**
 * 创建虚拟 tag (占位符)
 * 1. reducer: action = { type: 'editor/createFictitiousTag' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.parent 父级节点
 * @return {Object} 更新后的状态
 */
export const createFictitiousTag = (state, { parent }) => ({
  ... state,
  tags: {
    ... state.tags,
    newTag: {
      name: '',
      id: 'newTag',
      editor: true,
      parent: { id: parent },
    },
  },
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
export const createFictitiousArticle = (state, { tag }) => ({
  ... state,
  articles: {
    ... state.articles,
    newArticle: {
      name: '',
      editor: true,
      id: 'newArticle',
      tags: [{ id: tag }],
    },
  },
});

/**
 * 为 tag 添加编辑状态: 找到数据设置状态 editor = true
 * 1. reducer: action = { type: 'editor/addEditorStatusWithTag' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.id 要修改 tag id
 * @return {Object} 更新后的状态
 */
export const addEditorStatusWithTag = (state, { id }) => {
  const tags = { ... state.tags };
  tags[id].editor = true;
  return { ... state, tags };
};

/**
 * 为 article 添加编辑状态: 找到数据设置状态 editor = true
 * 1. reducer: action = { type: 'editor/addEditorStatusWithArticle' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.id 要修改 article id
 * @return {Object} 更新后的状态
 */
export const addEditorStatusWithArticle = (state, { id }) => {
  const articles = { ... state.articles };
  articles[id].editor = true;
  return { ... state, articles };
};


/**
 * 设置 side 状态
 * 1. reducer: action = { type: 'editor/setSide', side }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.id 要修改 article id
 * @return {Object} 更新后的状态
 */
export const setSide = (state, { side }) => ({
  ... state,
  side: { ... state.side, ... side },
});
