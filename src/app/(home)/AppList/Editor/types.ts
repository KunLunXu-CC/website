import { EditorArticleItemFragment, EditorFolderItemFragment } from '@/gql/graphql';

export interface IArticlesState {
  folders: Record<string, EditorFolderItemFragment>;
  articles: Record<string, EditorArticleItemFragment>;
}

export interface IArticlesStore extends IArticlesState {
  setFolders: (folders: EditorFolderItemFragment[]) => void;
  setArticles: (articles: EditorArticleItemFragment[]) => void;
}

// ------------------------------

export interface ISearchState {}

export interface ISearchStore extends ISearchState {}

// ------------------------------

export interface IWorkState {}

export interface IWorkStore extends IWorkState {}

// ------------------------------
