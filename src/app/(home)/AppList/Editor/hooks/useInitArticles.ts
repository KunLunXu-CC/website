/* eslint-disable react-hooks/rules-of-hooks */
import client from '@/gql/client';
import useArticlesStore from './useArticlesStore';
import { useEffect } from 'react';
import { graphql, useFragment } from '@/gql';
import { useQuery } from '@tanstack/react-query';
import { InitEditorArticlesQuery, EditorFolderItemFragmentDoc, EditorArticleItemFragmentDoc } from '@/gql/graphql';

graphql(`
  fragment EditorFolderItem on Folder {
    id
    name
    parent {
      id
      name
    }
  }

  fragment EditorArticleItem on Article {
    id
    name
    thumb
    status
    content
    folder {
      id
      name
    }
  }
`);

const InitEditorArticlesDocument = graphql(`
  query InitEditorArticles {
    folders(search: { type: [0] }) {
      list {
        ...EditorFolderItem
      }
    }
    articles {
      list {
        ...EditorArticleItem
      }
    }
  }
`);

const useInitArticles = () => {
  const { data } = useQuery<InitEditorArticlesQuery>({
    queryKey: ['initEditorArticles'],
    queryFn: () => client.request(InitEditorArticlesDocument),
  });

  const { setFolders, setArticles } = useArticlesStore();

  useEffect(() => {
    if (data) {
      setFolders(useFragment(EditorFolderItemFragmentDoc, data?.folders?.list ?? []));
      setArticles(useFragment(EditorArticleItemFragmentDoc, data?.articles?.list ?? []));
    }
  }, [data, setArticles, setFolders]);
};

export default useInitArticles;
