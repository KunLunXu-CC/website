// 工作区, 和文章(目录)挂钩, 后面可能还有其他
import { create } from 'zustand';
import { IWorkspaceStore, WORKSPACE_TYPE } from '../types';

const useWorkspaceStore = create<IWorkspaceStore>((set, get) => ({
  workspaces: [],
  appendArticleWorkspace: (articleId) => {
    const { workspaces } = get();

    // 已打开, 切换 tab
    if (workspaces.find((v: any) => v.dataId === articleId)) {
      set({
        workspaces: workspaces.map((v: any) => ({
          ...v,
          active: v.dataId === articleId,
        })),
      });
      return;
    }

    set({ workspaces: [{ dataId: articleId, type: WORKSPACE_TYPE.ARTICLE, active: true }, ...workspaces] });
  },
  updateWorkspace: (workspace) => {
    const { workspaces } = get();
    set({
      workspaces: workspaces.map((v) => {
        if (v.dataId === workspace.dataId) {
          return {
            ...v,
            ...workspace,
          };
        }

        return v;
      }),
    });
  },
  removeWorkspace: (dataId: string) => {
    const { workspaces } = get();
    set({ workspaces: workspaces.filter((v) => v.dataId !== dataId) });
  },
}));

export default useWorkspaceStore;
