// 文章 + 目录
import { create } from 'zustand';
import { IResourceStore } from '../types';
import { NEW_FLAG_ID } from '../constants';
import { STATUS } from '@/config/constants';

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
    setFolders([...Object.values(folders), folder]);
  },
  removeFolder: (folderId) => {
    const { folders, setFolders } = get();
    const newFolders = Object.values(folders).filter((v) => v.id !== folderId);
    setFolders(newFolders);
  },
  updateFolder: (folder) => {
    const { folders, setFolders } = get();
    const newFolders = Object.values(folders).map((v) => {
      if (v.id === folder.id) {
        return { ...v, editor: false, ...folder };
      }
      return v;
    });
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
  removeTmpFolder: () => {
    const { folders, setFolders } = get();
    const newFolders = Object.values(folders).filter((v) => v.id !== NEW_FLAG_ID);
    setFolders(newFolders);
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
          status: STATUS.ENABLE,
          folder: { id: folderId },
        },
      },
    });
  },
  removeTmpArticle: () => {
    const { articles, setArticles } = get();
    const newArticles = Object.values(articles).filter((v) => v.id !== NEW_FLAG_ID);
    setArticles(newArticles);
  },
  appendArticle: (article) => {
    const { articles, setArticles } = get();
    setArticles([...Object.values(articles), article]);
  },
  removeArticle: (articleId) => {
    const { articles, setArticles } = get();
    const newArticles = Object.values(articles).filter((v) => v.id !== articleId);
    setArticles(newArticles);
  },
  updateArticle: (article) => {
    const { articles, setArticles } = get();
    const newArticles = Object.values(articles).map((v) => {
      if (v.id === article.id) {
        return { ...v, editor: false, ...article };
      }
      return v;
    });
    setArticles(newArticles);
  },
  findArticle: (articleId) => get().articles[articleId],
}));

export default useResourceStore;
