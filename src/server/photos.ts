import client from "@/gql/client";
import { graphql } from "@/gql";
import { PhotosQuery, PhotosQueryVariables } from "@/gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";

// 获取图片
const PhotosDocument = graphql(`
  query Photos($search: PhotoSearch) {
    photos(search: $search) {
      list {
        id
        type
        name
      }
    }
  }
`);

// 删除图片
const RemovePhotosDocument = graphql(`
  mutation RemovePhotos($conds: PhotoSearch!, $search: PhotoSearch) {
    removePhotos(
      conds: $conds
      search: $search
      orderBy: { creationTime: -1 }
    ) {
      change {
        id
      }
    }
  }
`);

// 上传
const UploadPhotosDocument = graphql(`
  mutation uploadPhotos($body: PhotoFields!) {
    uploadPhotos(body: $body) {
      change {
        id
        type
        name
      }
    }
  }
`);

// 获取图片
export const usePhotosQuery = (search: PhotosQueryVariables) => {
  const query = useQuery<PhotosQuery>({
    queryKey: ["photos", search],
    queryFn: () => client.request(PhotosDocument, { search }),
  });

  return query;
};

// 删除图片, TODO: TS 补充
export const useRemovePhotosMutation = () => {
  const mutation = useMutation({
    mutationKey: ["removePhotos"],
    mutationFn: (conds: any) => client.request(RemovePhotosDocument, conds),
  });

  return mutation;
};

// 上传, TODO: TS 补充
export const useUploadPhotosMutation = () => {
  const mutation = useMutation({
    mutationKey: ["uploadPhotos"],
    mutationFn: (body: any) => client.request(UploadPhotosDocument, { body }),
  });

  return mutation;
};
