import { cloneDeep } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { ACTIVITY_LIST } from '@app/Editor/constants';

export const initialState = {
  folders: {},        // {[id]: value}
  articles: {},    // {[id]: value}
  side: {
    openKeys: [],     // 打开的菜单项
    collapsed: false, // 菜单折叠状态, 是否收缩到最小
  },
  activity: {
    selectKey: ACTIVITY_LIST[0].key,  // 当前选中 key
  },
  search: {
    keyword: '',
    results: [],
  },
  works: [], // [{ article, change: false }]
};

export default createSlice({
  initialState,
  name: 'editor',
  reducers: {
    setActivity: (state, { payload: activity }) => ({
      ...state,
      activity: { ...state.activity, ...activity },
    }),

    setSearchKeyword: (state, { payload: keyword }): any => {
      const results = keyword
        ? Object.values(cloneDeep(state.articles)).filter((v: any) => {
          const matchName = RegExp(keyword, 'i').test(v.name);
          const matchValue = RegExp(keyword, 'i').test(v.content);
          return matchName ||  matchValue;
        })
        : [];

      return {
        ...state,
        search: { keyword, results },
      };
    },

    setFolders: (state, { payload: folders }) => {
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

    removeFolders: (state, { payload: folders }) => {
      const newFolders = cloneDeep(state.folders);
      folders.forEach(({ id }: { id:string }) => {
        delete (newFolders as any)[id];
      });
      return { ...state, folders: newFolders };
    },

    setArticles: (state, { payload: articles }) => {
      const newArticles = [
        ...Object.values(state.articles),
        ...articles,
      ].filter((v) => v.id !== 'new');

      return {
        ...state,
        articles: newArticles.reduce((total: any, ele: { id: any; }) => ({
          ...total,
          [ele.id]: ele,
        }), {}),
      };
    },

    removeArticles: (state, { payload: articles }) => {
      const newArticles = cloneDeep(state.articles);
      articles.forEach(({ id }: { id: string }) => {
        delete (newArticles as any)[id];
      });
      return { ...state, articles: newArticles };
    },

    setSide: (state, { payload: side }) => ({
      ...state,
      side: { ...state.side, ...side },
    }),

    // 插入工作窗口配置
    appendWork: (state, { payload: articleId }): any => {
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

    setWorks: (state, { payload: works }): any => ({
      ...state,
      works: state.works.map((v: any) => {
        const newWork = works.find(
          (e: any) => e.articleId === v.articleId,
        ) ?? {};

        return { ...v, ...newWork };
      }),
    }),

    // 移除工作窗口: 没传 article 则移除所有
    removeWorks: (state, { payload: articleIds }): any => {
      if (!articleIds) {
        return { ...state, works: [] };
      }

      const works = cloneDeep(state.works).filter(
        (v: any) => !articleIds.includes(v.articleId),
      );

      // 如果所有 active 都是 false, 则需要将最后一个 active 设置为 true
      if (works.length > 0 && works.every((v: any) => !v.active)) {
        (works[works.length - 1] as any).active = true;
      }

      return { ...state, works };
    },

    // 创建临时 folder (占位符)
    createTmpFolder: (state, { payload: parentId }) => ({
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

    // 创建临时 article (占位符)
    createTmpArticle: (state, { payload: folderId }) => ({
      ...state,
      articles: {
        ...state.articles,
        new: {
          name: '',
          id: 'new',
          editor: true,
          folder: { id: folderId },
        },
      },
    }),

    // 为 folder 添加编辑状态: 找到数据设置状态 editor = true
    addEditorStatusWithFolder: (state, { payload: folderId }) => {
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

