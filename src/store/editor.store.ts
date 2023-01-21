import { createSlice } from '@reduxjs/toolkit';
import { ACTIVITY_LIST } from '@app/Editor/consts';

export const initialState = {
  tags: {},        // {[id]: value}
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
    setTags: (state, { payload: tags }) => ({
      ...state,
      tags: tags.reduce((total: any, ele: { id: any; }) => ({
        ...total,
        [ele.id]: ele,
      }), {}),
    }),

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
            action: v.articleId === articleId,
          })),
        };
      }

      return {
        ...state,
        works: [
          ...state.works.map((v: any) => ({ ...v, action: false })),
          {
            articleId,
            action: true,
            change: false,
          },
        ],
      };
    },

    // 移除工作窗口: 没传 article 则移除所有
    removeWork: (state, { payload: articleId }): any => {
      console.log('%c [ articleId ]-75', 'font-size:13px; background:pink; color:#bf2c9f;', articleId);
      return state;
      const works = [...state.works]
        .reverse()
        .reduce((total, ele: any): any => {
          const idClose = ele.articleId === articleId;
          const newWorks = idClose ? total : [...total, { ...ele }];

          // 关闭已选中的
          if (idClose && ele.action && newWorks[0]) {
            newWorks[0].action = true;
          }

          return newWorks;
        }, [])
        .reverse();
      console.log('%c [ works ]-89', 'font-size:13px; background:pink; color:#bf2c9f;', works);
      return { ...state, works };
    },
  },
});
