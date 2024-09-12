// 文章 + 目录
import { create } from 'zustand';
import { IResourceStore } from '../types';
import { NEW_FLAG_ID } from '../constants';

const useResourceStore = create<IResourceStore>((set, get) => ({
  folders: {},
  articles: {},
  openFolderIds: [],
  setFolders: (folders) => {
    const newFolders = folders.reduce<IResourceStore['folders']>(
      (total, ele) => ({
        ...total,
        [ele.id as string]: ele,
      }),
      {},
    );
    set({ folders: newFolders });
  },
  appendFolder: (folder) => {
    const { folders, setFolders } = get();
    const newFolders = [...Object.values(folders), folder].filter((v) => v.id !== NEW_FLAG_ID);
    setFolders(newFolders);
  },
  setOpenFolderIds: (ids) => set({ openFolderIds: ids }),
  openFolder: (id) => set({ openFolderIds: [...get().openFolderIds, id] }),
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
    const newArticles = articles.reduce<IResourceStore['articles']>(
      (total, ele) => ({
        ...total,
        [ele.id as string]: ele,
      }),
      {},
    );
    set({ articles: newArticles });
  },
  // 创建临时 article (占位符)
  createTmpArticle: (folderId) => {
    set({
      articles: {
        ...get().articles,
        new: {
          name: '',
          id: 'new',
          editor: true,
          folder: { id: folderId },
        },
      },
    });
  },
  appendArticle: (article) => {
    const { articles, setArticles } = get();
    const newArticles = [...Object.values(articles), article].filter((v) => v.id !== NEW_FLAG_ID);
    setArticles(newArticles);
  },
  findArticle: (articleId) => get().articles[articleId],
}));

export default useResourceStore;
