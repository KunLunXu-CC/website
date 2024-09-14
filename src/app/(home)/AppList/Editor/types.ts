import { EditorResourceArticleItemFragment, EditorResourceFolderItemFragment } from '@/gql/graphql';

export enum ACTIVITY_BAR_KEY {
  RESOURCE = 'resource',
  SEARCH = 'search',
}

export interface IResourceFolderItem extends EditorResourceFolderItemFragment {
  editor?: boolean;
}

export interface IResourceArticleItem extends EditorResourceArticleItemFragment {
  editor?: boolean;
}

export type IResourceItem = IResourceFolderItem &
  IResourceArticleItem & {
    childrenLength?: number;
    children?: IResourceItem[];
  };

// ------------------------------

export interface IResourceState {
  folders: Record<string, IResourceFolderItem>;
  articles: Record<string, IResourceArticleItem>;
  openFolderIds: string[];
}

export interface IResourceStore extends IResourceState {
  setFolders: (folders: IResourceFolderItem[]) => void;
  appendFolder: (folder: IResourceFolderItem) => void;
  removeFolder: (folderId: string) => void;
  updateFolder: (folder: Partial<IResourceFolderItem>) => void;
  openFolder: (id: string) => void;
  setOpenFolderIds: (ids: string[]) => void;
  createTmpFolder: (parentId: string | null) => void;
  removeTmpFolder: () => void;
  createTmpArticle: (folderId: string) => void;
  removeTmpArticle: () => void;
  setArticles: (articles: IResourceArticleItem[]) => void;
  appendArticle: (article: IResourceArticleItem) => void;
  removeArticle: (articleId: string) => void;
  updateArticle: (article: Partial<IResourceArticleItem>) => void;
  findArticle: (articleId: string) => IResourceArticleItem | undefined;
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
  updateWorkspace: (workspace: Partial<IWorkspace> & { dataId: string }) => void;
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
