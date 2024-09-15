import client from '@/gql/client';
import useResourceStore from './useResourceStore';
import { graphql } from '@/gql';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ArticleFields, EditorUpdateArticleMutation, EditorUpdateArticleMutationVariables } from '@/gql/graphql';

const EditorUpdateArticleDocument = graphql(`
  mutation EditorUpdateArticle($body: ArticleFields!, $conds: ArticleSearch!) {
    updateArticles(body: $body, conds: $conds) {
      change {
        ...EditorResourceArticleItem
      }
    }
  }
`);

const useUpdateArticle = () => {
  const { updateArticle } = useResourceStore();

  const { mutateAsync: updateArticleFetch } = useMutation<
    EditorUpdateArticleMutation,
    Error,
    EditorUpdateArticleMutationVariables
  >({
    mutationKey: ['updateArticle'],
    mutationFn: (variables) => client.request(EditorUpdateArticleDocument, variables),
  });

  const handleUpdateArticle = useCallback(
    async (article: Partial<ArticleFields> & { id: string }) => {
      const { id, ...body } = article;

      const {
        updateArticles: { change },
      } = await updateArticleFetch({
        body,
        conds: { id },
      });

      updateArticle(change[0]);
    },
    [updateArticle, updateArticleFetch],
  );

  return { updateArticle: handleUpdateArticle };
};

export default useUpdateArticle;
