import client from "@/gql/client";
import useAlbumStore from "./useAlbumStore";

import { graphql } from "@/gql";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  AlbumUploadMutation,
  AlbumPhotoItemFragment,
  AlbumUploadMutationVariables,
} from "@/gql/graphql";

const AlbumUploadDocument = graphql(`
  mutation AlbumUpload($body: PhotoFields!) {
    uploadPhotos(body: $body) {
      change {
        ...AlbumPhotoItem
      }
    }
  }
`);

const useAlbumUpload = () => {
  const { form, appendPhotos } = useAlbumStore();

  const { mutateAsync: upload } = useMutation<
    AlbumUploadMutation,
    Error,
    AlbumUploadMutationVariables
  >({
    mutationKey: ["uploadPhotos"],
    mutationFn: (variables) => client.request(AlbumUploadDocument, variables),
  });

  const onUpload = useCallback(async () => {
    const { uploadPhotos } = await upload({
      body: { files: form.files, type: form.type },
    });

    appendPhotos(uploadPhotos.change as AlbumPhotoItemFragment[]);
  }, [form.files, form.type, upload, appendPhotos]);

  return { onUpload };
};

export default useAlbumUpload;
