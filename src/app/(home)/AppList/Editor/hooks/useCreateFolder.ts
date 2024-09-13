/* eslint-disable react-hooks/rules-of-hooks */
import client from '@/gql/client';
import useResourceStore from './useResourceStore';
import { graphql } from '@/gql';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { EditorCreateFolderMutation, EditorCreateFolderMutationVariables, Maybe } from '@/gql/graphql';

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
  const { appendFolder, removeTmpFolder } = useResourceStore();
  const { mutateAsync: createFolders } = useMutation<
    EditorCreateFolderMutation,
    Error,
    EditorCreateFolderMutationVariables
  >({
    mutationKey: ['createFolder'],
    mutationFn: (variables) => client.request(EditorCreateFolderDocument, variables),
  });

  const handleCreateFolders = useCallback(
    async ({ name, parentId }: { name: string; parentId?: Maybe<string> }) => {
      removeTmpFolder();

      if (!name) {
        return;
      }

      const { createFolders: res } = await createFolders({ body: { name, parent: parentId } });
      appendFolder(res.change[0]);
    },
    [appendFolder, createFolders, removeTmpFolder],
  );

  return { createFolders: handleCreateFolders };
};

export default useCreateFolder;
