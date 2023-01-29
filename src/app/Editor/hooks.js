import {
  // useCreateFoldersMutation,
  // useUpdateFoldersMutation,
  // useRemoveFoldersMutation,
  // useCreateArticlesMutation,
  useUpdateArticlesMutation,
  // useRemoveArticlesMutation,
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

export const span = 1;
