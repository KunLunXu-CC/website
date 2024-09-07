/* eslint-disable react-hooks/rules-of-hooks */
import client from '@/gql/client';
import useResourceStore from './useResourceStore';

import { useEffect } from 'react';
import { graphql, useFragment } from '@/gql';
import { useQuery } from '@tanstack/react-query';
import {
  InitEditorResourceQuery,
  EditorResourceFolderItemFragmentDoc,
  EditorResourceArticleItemFragmentDoc,
} from '@/gql/graphql';

graphql(`
  fragment EditorResourceFolderItem on Folder {
    id
    name
    parent {
      id
      name
    }
  }

  fragment EditorResourceArticleItem on Article {
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

const InitEditorResourceDocument = graphql(`
  query InitEditorResource {
    folders(search: { type: [0] }) {
      list {
        ...EditorResourceFolderItem
      }
    }
    articles {
      list {
        ...EditorResourceArticleItem
      }
    }
  }
`);

const useInitArticles = () => {
  const { data } = useQuery<InitEditorResourceQuery>({
    queryKey: ['initEditorResource'],
    queryFn: () => client.request(InitEditorResourceDocument),
  });

  const { setFolders, setArticles } = useResourceStore();

  useEffect(() => {
    if (data) {
      console.log('%c [ data ]-62', 'font-size:13px; background:pink; color:#bf2c9f;', data);

      setFolders(useFragment(EditorResourceFolderItemFragmentDoc, data?.folders?.list ?? []));
      setArticles(useFragment(EditorResourceArticleItemFragmentDoc, data?.articles?.list ?? []));
    }
  }, [data, setArticles, setFolders]);
};

export default useInitArticles;
