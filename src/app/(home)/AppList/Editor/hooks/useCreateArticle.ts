/* eslint-disable react-hooks/rules-of-hooks */
import client from '@/gql/client';
import useResourceStore from './useResourceStore';

import { graphql, useFragment } from '@/gql';
import { useMutation } from '@tanstack/react-query';
import {
  Maybe,
  EditorCreateArticleMutation,
  EditorCreateArticleMutationVariables,
  EditorResourceArticleItemFragmentDoc,
} from '@/gql/graphql';
import { useCallback } from 'react';

const EditorCreateArticleDocument = graphql(`
  mutation EditorCreateArticle($body: ArticleFields!) {
    createArticles(body: [$body]) {
      change {
        ...EditorResourceArticleItem
      }
    }
  }
`);

const useCreateArticle = () => {
  const { appendArticle, removeTmpArticle } = useResourceStore();
  const { mutateAsync: createArticles } = useMutation<
    EditorCreateArticleMutation,
    Error,
    EditorCreateArticleMutationVariables
  >({
    mutationKey: ['createArticle'],
    mutationFn: (Variables) => client.request(EditorCreateArticleDocument, Variables),
  });

  const handleCreateArticle = useCallback(
    async ({ name, folderId }: { name: string; folderId?: Maybe<string> }) => {
      removeTmpArticle();

      if (!name) {
        return;
      }

      const { createArticles: res } = await createArticles({ body: { name, folder: folderId } });
      appendArticle(useFragment(EditorResourceArticleItemFragmentDoc, res.change[0]));
    },
    [appendArticle, createArticles, removeTmpArticle],
  );

  return { createArticle: handleCreateArticle };
};

export default useCreateArticle;
