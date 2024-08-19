import client from "@/gql/client";
import useAlbumStore from "./useAlbumStore";
import { useEffect } from "react";
import { graphql, useFragment } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import { AlbumPhotoItemFragmentDoc, AlbumSearchQuery } from "@/gql/graphql";

graphql(`
  fragment AlbumPhotoItem on Photo {
    id
    type
    name
    creationTime
  }
`);

const AlbumSearchDocument = graphql(`
  query AlbumSearch {
    photos {
      list {
        ...AlbumPhotoItem
      }
    }
  }
`);

const useAlbumSearch = () => {
  const { setPhoneList } = useAlbumStore();

  const { data: albumSearch } = useQuery<AlbumSearchQuery>({
    queryKey: ["albumSearch"],
    queryFn: () => client.request(AlbumSearchDocument),
  });

  const photos = useFragment(
    AlbumPhotoItemFragmentDoc,
    albumSearch?.photos?.list ?? [],
  );

  useEffect(() => {
    if (photos.length) {
      setPhoneList(photos);
    }
  }, [photos, setPhoneList]);
};

export default useAlbumSearch;
