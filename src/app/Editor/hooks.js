import {
  useCreateFoldersMutation,
  useUpdateFoldersMutation,
  useRemoveFoldersMutation,
  useCreateArticlesMutation,
  useUpdateArticlesMutation,
  useRemoveArticlesMutation,
} from '@store/graphql';
import { actions } from '@store';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useHandleUpdateArticles = () => {
  const dispatch = useDispatch();
  const [updateArticles] = useUpdateArticlesMutation();

  return useCallback(async ({ body,  conds }) => {
    const { data } = await updateArticles({ body, conds });
    dispatch(actions.editor.setArticles(data.updateArticles?.change));
  }, [dispatch, updateArticles]);
};

export const useHandleUpdateFolders = () => {
  const dispatch = useDispatch();
  const [updateFolders] = useUpdateFoldersMutation();

  return useCallback(async ({ body,  conds }) => {
    const { data } = await updateFolders({ body, conds });
    dispatch(actions.editor.setFolders(data.updateFolders.change));
  }, [dispatch, updateFolders]);
};

export const useHandleCreateFolders = () => {
  const dispatch = useDispatch();
  const [createFolders] = useCreateFoldersMutation();

  return useCallback(async ({ body }) => {
    const { data } = await createFolders({ body });
    dispatch(actions.editor.setFolders(data.createFolders.change));
  }, [dispatch, createFolders]);
};

export const useHandleCreateArticles = () => {
  const dispatch = useDispatch();
  const [createArticles] = useCreateArticlesMutation();

  return useCallback(async ({ body }) => {
    const { data } = await createArticles({ body });
    dispatch(actions.editor.setArticles(data.createArticles.change));
  }, [dispatch, createArticles]);
};


export const useHandleRemoveFolders = () => {
  const dispatch = useDispatch();
  const [removeFolders] = useRemoveFoldersMutation();

  return useCallback(async ({ conds }) => {
    // 删除文件夹
    const { data: foldersData } = await removeFolders({ conds });
    dispatch(actions.editor.removeFolders (
      foldersData.removeFolders.change,
    ));
  }, [dispatch, removeFolders]);
};

export const useHandleRemoveArticles = () => {
  const dispatch = useDispatch();
  const [removeArticles] = useRemoveArticlesMutation();

  return useCallback(async ({ conds }) => {
    const { data: articlesData } = await removeArticles({
      conds,
    });
    dispatch(actions.editor.removeWorks(
      articlesData.removeArticles.change.map((v) => v.id),
    ));
    dispatch(actions.editor.removeArticles(
      articlesData.removeArticles.change,
    ));
  }, [dispatch, removeArticles]);
};
