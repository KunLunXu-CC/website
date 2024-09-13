import client from '@/gql/client';
import useResourceStore from './useResourceStore';
import { graphql } from '@/gql';
import { EditorRemoveFolderMutation, EditorRemoveFolderMutationVariables } from '@/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

const EditorRemoveFolderDocument = graphql(`
  mutation EditorRemoveFolder($conds: FolderSearch!) {
    removeFolders(conds: $conds) {
      change {
        id
        name
        parent {
          id
          name
        }
      }
    }
  }
`);

const useRemoveFolder = () => {
  const { removeFolder } = useResourceStore();

  const { mutateAsync: removeFolderFetch } = useMutation<
    EditorRemoveFolderMutation,
    Error,
    EditorRemoveFolderMutationVariables
  >({
    mutationKey: ['removeFolders'],
    mutationFn: (variables) => client.request(EditorRemoveFolderDocument, variables),
  });

  const handleRemoveFolder = useCallback(
    (folderId: string) => {
      removeFolder(folderId);
      removeFolderFetch({ conds: { id: folderId } });
    },
    [removeFolder, removeFolderFetch],
  );

  return { removeFolder: handleRemoveFolder };
};

export default useRemoveFolder;
