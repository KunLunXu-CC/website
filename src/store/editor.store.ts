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
  works: [],
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
  },
});
