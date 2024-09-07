// 文章 + 目录
import { create } from 'zustand';
import { IResourceStore } from '../types';
import { NEW_FLAG_ID } from '../constants';

const useResourceStore = create<IResourceStore>((set, get) => ({
  folders: {},
  articles: {},
  openFolders: [],
  setFolders: (folders) => {
    const newFolders = [...Object.values(get().folders), ...folders]
      .filter((v) => v.id !== NEW_FLAG_ID)
      .reduce<IResourceStore['folders']>(
        (total, ele) => ({
          ...total,
          [ele.id as string]: ele,
        }),
        {},
      );

    set({ folders: newFolders });
  },
  createTmpFolder: (parentId) => {
    set({
      folders: {
        ...get().folders,
        new: {
          name: '',
          id: 'new',
          editor: true,
          parent: { id: parentId },
        },
      },
    });
  },
  setArticles: (articles) => {
    const newArticles = [...Object.values(get().articles), ...articles]
      .filter((v) => v.id !== NEW_FLAG_ID)
      .reduce<IResourceStore['articles']>(
        (total, ele) => ({
          ...total,
          [ele.id as string]: ele,
        }),
        {},
      );

    set({ articles: newArticles });
  },
  setOpenFolders: (openFolders) => set({ openFolders }),
  findArticle: (articleId) => get().articles[articleId],
}));

export default useResourceStore;
