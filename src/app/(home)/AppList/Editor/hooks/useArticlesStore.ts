// 文章 + 目录
import { create } from 'zustand';
import { IArticlesStore } from '../types';
import { NEW_FLAG_ID } from '../constants';

const useArticlesStore = create<IArticlesStore>((set, get) => ({
  folders: {},
  articles: {},
  setFolders: (folders) => {
    const newFolders = [...Object.values(get().folders), ...folders]
      .filter((v) => v.id !== NEW_FLAG_ID)
      .reduce<IArticlesStore['folders']>(
        (total, ele) => ({
          ...total,
          [ele.id as string]: ele,
        }),
        {},
      );

    set({ folders: newFolders });
  },
  setArticles: (articles) => {
    const newArticles = [...Object.values(get().articles), ...articles]
      .filter((v) => v.id !== NEW_FLAG_ID)
      .reduce<IArticlesStore['articles']>(
        (total, ele) => ({
          ...total,
          [ele.id as string]: ele,
        }),
        {},
      );

    set({ articles: newArticles });
  },
}));

export default useArticlesStore;
