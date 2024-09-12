/* eslint-disable react-hooks/rules-of-hooks */
import client from '@/gql/client';
import useResourceStore from './useResourceStore';
import { graphql } from '@/gql';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { EditorCreateFolderMutation, EditorCreateFolderMutationVariables } from '@/gql/graphql';

const EditorCreateFolderDocument = graphql(`
  mutation EditorCreateFolder($body: FolderFields!) {
    createFolders(body: [$body]) {
      change {
        ...EditorResourceFolderItem
      }
    }
  }
`);

const useCreateFolder = () => {
  const { appendFolder } = useResourceStore();
  const { mutateAsync: createFolders } = useMutation<
    EditorCreateFolderMutation,
    Error,
    EditorCreateFolderMutationVariables
  >({
    mutationKey: ['createFolder'],
    mutationFn: (Variables) => client.request(EditorCreateFolderDocument, Variables),
  });

  const handleCreateFolders = useCallback(
    async ({ name, parentId }: { name: string; parentId: string }) => {
      const { createFolders: res } = await createFolders({ body: { name, parent: parentId } });
      appendFolder(res.change[0]);
    },
    [appendFolder, createFolders],
  );

  return { createFolders: handleCreateFolders };
};

export default useCreateFolder;
