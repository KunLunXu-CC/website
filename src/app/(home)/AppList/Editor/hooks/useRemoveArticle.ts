import client from '@/gql/client';
import useResourceStore from './useResourceStore';
import useWorkspaceStore from './useWorkspaceStore';
import { graphql } from '@/gql';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { EditorRemoveArticleMutation, EditorRemoveArticleMutationVariables } from '@/gql/graphql';

const EditorRemoveArticleDocument = graphql(`
  mutation EditorRemoveArticle($conds: ArticleSearch!) {
    removeArticles(conds: $conds) {
      change {
        id
      }
    }
  }
`);

const useRemoveArticle = () => {
  const { removeArticle } = useResourceStore();
  const { removeWorkspace } = useWorkspaceStore();
  const { mutateAsync: removeArticleFetch } = useMutation<
    EditorRemoveArticleMutation,
    Error,
    EditorRemoveArticleMutationVariables
  >({
    mutationKey: ['removeArticle'],
    mutationFn: (variables) => client.request(EditorRemoveArticleDocument, variables),
  });

  const handleRemoveArticle = useCallback(
    (articleId: string) => {
      removeWorkspace(articleId);
      removeArticle(articleId);
      removeArticleFetch({
        conds: { id: articleId },
      });
    },
    [removeArticle, removeArticleFetch, removeWorkspace],
  );

  return { removeArticle: handleRemoveArticle };
};

export default useRemoveArticle;
