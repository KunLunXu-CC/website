import client from "@/gql/client";

import { graphql } from "@/gql";
import { useCallback } from "react";
import useAlbumStore from "./useAlbumStore";
import { useMutation } from "@tanstack/react-query";
import {
  AlbumRemoveMutation,
  AlbumRemoveMutationVariables,
} from "@/gql/graphql";

const AlbumRemoveDocument = graphql(`
  mutation AlbumRemove($conds: PhotoSearch!, $search: PhotoSearch) {
    removePhotos(conds: $conds, search: $search) {
      change {
        id
      }
    }
  }
`);

const useAlbumRemove = () => {
  const { removePhotos } = useAlbumStore();

  const { mutateAsync: remove } = useMutation<
    AlbumRemoveMutation,
    Error,
    AlbumRemoveMutationVariables
  >({
    mutationKey: ["uploadPhotos"],
    mutationFn: (variables) => client.request(AlbumRemoveDocument, variables),
  });

  const onRemove = useCallback(
    async (id: string) => {
      const data = await remove({ conds: { id } });
      const ids = data.removePhotos.change.map((photo) => photo.id);
      removePhotos(ids);
    },
    [remove, removePhotos],
  );

  return { onRemove };
};

export default useAlbumRemove;
