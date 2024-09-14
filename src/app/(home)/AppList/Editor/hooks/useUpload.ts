import client from '@/gql/client';

import { graphql } from '@/gql';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { EditorUploadMutation, EditorUploadMutationVariables } from '@/gql/graphql';
import { PHOTO_TYPE } from '@/config/constants';

const EditorUploadDocument = graphql(`
  mutation EditorUpload($body: PhotoFields!) {
    uploadPhotos(body: $body) {
      change {
        name
      }
    }
  }
`);

const useEditorUpload = () => {
  const { mutateAsync: upload } = useMutation<EditorUploadMutation, Error, EditorUploadMutationVariables>({
    mutationKey: ['uploadPhotos'],
    mutationFn: (variables) => client.request(EditorUploadDocument, variables),
  });

  const handleUpload = useCallback(
    async (body: { files: File[]; payload: string }) => {
      const { uploadPhotos } = await upload({
        body: {
          ...body,
          type: PHOTO_TYPE.ARTICLE.VALUE,
        },
      });

      return uploadPhotos.change as { name: string }[];
    },
    [upload],
  );

  return { upload: handleUpload };
};

export default useEditorUpload;
