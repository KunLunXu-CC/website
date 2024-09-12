import { EditorResourceArticleItemFragment, EditorResourceFolderItemFragment } from '@/gql/graphql';

export enum ACTIVITY_BAR_KEY {
  RESOURCE = 'resource',
  SEARCH = 'search',
}

export interface IResourceState {
  folders: Record<string, EditorResourceFolderItemFragment>;
  articles: Record<string, EditorResourceArticleItemFragment>;
  openFolderIds: string[];
}

export interface IResourceStore extends IResourceState {
  setFolders: (folders: EditorResourceFolderItemFragment[]) => void;
  appendFolder: (folder: EditorResourceFolderItemFragment) => void;
  openFolder: (id: string) => void;
  setOpenFolderIds: (ids: string[]) => void;
  createTmpFolder: (parentId: string | null) => void;
  createTmpArticle: (folderId: string) => void;
  setArticles: (articles: EditorResourceArticleItemFragment[]) => void;
  appendArticle: (article: EditorResourceArticleItemFragment) => void;
  findArticle: (articleId: string) => EditorResourceArticleItemFragment | undefined;
}

// ------------------------------

export interface ISearchState {}

export interface ISearchStore extends ISearchState {}

// ------------------------------
export enum WORKSPACE_TYPE {
  ARTICLE = 'article',
}

export interface IWorkspace {
  dataId: string;
  type: WORKSPACE_TYPE;
  active?: boolean;
  change?: boolean;
}

export interface IWorkspaceState {
  workspaces: IWorkspace[];
}

export interface IWorkspaceStore extends IWorkspaceState {
  appendArticleWorkspace: (articleId: string) => void;
  removeWorkspace: (articleId: string) => void;
}

// ------------------------------

export interface IEditorState {
  isSideBarCollapsed: boolean; // 菜单折叠状态, 是否收缩到最小
  selectedActivityBarKey: ACTIVITY_BAR_KEY; // 活动栏 当前选中 key
}

export interface IEditorStore extends IEditorState {
  setIsSideBarCollapsed: (isSideBarCollapsed: IEditorState['isSideBarCollapsed']) => void;
  setSelectedActivityBarKey: (selectedActivityBarKey: IEditorState['selectedActivityBarKey']) => void;
}
