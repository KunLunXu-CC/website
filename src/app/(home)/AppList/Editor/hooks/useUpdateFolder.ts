import client from '@/gql/client';
import useResourceStore from './useResourceStore';
import { graphql } from '@/gql';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { EditorUpdateFolderMutation, EditorUpdateFolderMutationVariables, FolderFields } from '@/gql/graphql';

const EditorUpdateFolderDocument = graphql(`
  mutation EditorUpdateFolder($body: FolderFields!, $conds: FolderSearch!) {
    updateFolders(body: $body, conds: $conds) {
      change {
        ...EditorResourceFolderItem
      }
    }
  }
`);

const useUpdateFolder = () => {
  const { mutateAsync: updateFolderFetch } = useMutation<
    EditorUpdateFolderMutation,
    Error,
    EditorUpdateFolderMutationVariables
  >({
    mutationKey: ['updateFolder'],
    mutationFn: (variables) => client.request(EditorUpdateFolderDocument, variables),
  });

  const { updateFolder } = useResourceStore();

  const handleUpdateFolder = useCallback(
    async (folder: Partial<FolderFields> & { id: string }) => {
      const { id, ...body } = folder;
      const {
        updateFolders: { change },
      } = await updateFolderFetch({
        body,
        conds: { id },
      });

      updateFolder(change[0]);
    },
    [updateFolder, updateFolderFetch],
  );

  return { updateFolder: handleUpdateFolder };
};

export default useUpdateFolder;
