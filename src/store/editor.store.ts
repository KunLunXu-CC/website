import { cloneDeep } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { ACTIVITY_LIST } from '@app/Editor/consts';

export const initialState = {
  folders: {},        // {[id]: value}
  articles: {},    // {[id]: value}
  preview: void 0, // 预览文章(文章 id)
  side: {
    openKeys: [],     // 打开的菜单项
    collapsed: false, // 菜单折叠状态, 是否收缩到最小
  },
  activity: {
    selectKey: ACTIVITY_LIST[0].key,  // 当前选中 key
  },
  works: [], // [{ article, change: false }]
};

export default createSlice({
  initialState,
  name: 'editor',
  reducers: {
    setTags: (state, { payload: folders }) => {
      const newFolders = [
        ...Object.values(state.folders),
        ...folders,
      ].filter((v) => v.id !== 'new');

      return {
        ...state,
        folders: newFolders.reduce((total: any, ele: { id: any; }) => ({
          ...total,
          [ele.id]: ele,
        }), {}),
      };
    },

    setArticles: (state, { payload: articles }) => ({
      ...state,
      articles: articles.reduce((total: any, ele: { id: any; }) => ({
        ...total,
        [ele.id]: ele,
      }), {}),
    }),

    setSide: (state, { payload: side }) => ({
      ...state,
      side: { ...state.side, ...side },
    }),

    //  插入工作窗口配置
    appendWorks: (state, { payload: articleId }): any => {
      if (!articleId || articleId === 'new') {
        return state;
      }

      // 已打开, 切换 tab
      if (state.works.find((v: any) => v.articleId === articleId)) {
        return {
          ...state,
          works: state.works.map((v: any) => ({
            ...v,
            active: v.articleId === articleId,
          })),
        };
      }

      return {
        ...state,
        works: [
          ...state.works.map((v: any) => ({ ...v, active: false })),
          {
            articleId,
            active: true,
            change: false,
          },
        ],
      };
    },

    // 移除工作窗口: 没传 article 则移除所有
    removeWork: (state, { payload: articleId }): any => {
      const works = cloneDeep(state.works).filter(
        (v: any) => v.articleId !== articleId,
      );

      // 如果所有 active 都是 false, 则需要将最后一个 active 设置为 true
      if (works.length > 0 && works.every((v: any) => !v.active)) {
        (works[works.length - 1] as any).active = true;
      }

      return { ...state, works };
    },

    // 创建临时 tag (占位符)
    createTmpTag: (state, { payload: parentId }) => ({
      ...state,
      folders: {
        ...state.folders,
        new: {
          name: '',
          id: 'new',
          editor: true,
          parent: { id: parentId },
        },
      },
    }),

    // 为 tag 添加编辑状态: 找到数据设置状态 editor = true
    addEditorStatusWithTag: (state, { payload: folderId }) => {
      const folders: any = cloneDeep(state.folders);
      folders[folderId].editor = true;
      return { ...state, folders };
    },

    //  为 article 添加编辑状态: 找到数据设置状态 editor = true
    addEditorStatusWithArticle: (state, { payload: articleId }) => {
      const articles: any = cloneDeep(state.articles);
      articles[articleId].editor = true;
      return { ...state, articles };
    },

  },
});

