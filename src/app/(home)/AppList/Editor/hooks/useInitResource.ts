import client from '@/gql/client';
import useResourceStore from './useResourceStore';

import { useEffect } from 'react';
import { graphql, useFragment } from '@/gql';
import { useQuery } from '@tanstack/react-query';
import {
  EditorInitResourceQuery,
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

const EditorInitResourceDocument = graphql(`
  query EditorInitResource {
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
  const { data } = useQuery<EditorInitResourceQuery>({
    queryKey: ['initEditorResource'],
    queryFn: () => client.request(EditorInitResourceDocument),
  });

  const { setFolders, setArticles } = useResourceStore();

  useEffect(() => {
    if (data) {
      setFolders(useFragment(EditorResourceFolderItemFragmentDoc, data?.folders?.list ?? []));
      setArticles(useFragment(EditorResourceArticleItemFragmentDoc, data?.articles?.list ?? []));
    }
  }, [data, setArticles, setFolders]);
};

export default useInitArticles;
