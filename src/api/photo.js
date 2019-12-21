
import axios from '@utils/request';

export const getPhotos = async ({
  search,
  pagination,
}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination },
      query: `
        query(
          $search: PhotoSearch,
          $pagination: Pagination,
        ){
          photos(
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              url
              name
              type
              creationTime
              sourceFileName
            }
            rescode
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.photos;
};

export const uploadPhotos = async ({
  type,
  files,
  payload,
}) => {
  const formData = new FormData();
  payload && formData.append('payload', payload);
  _.isFinite(type) && formData.append('type', type);
  files.forEach(v => (formData.append('file', v)));

  const res = await axios({
    data: formData,
    method: 'post',
    url: '/photo/upload',
    timeout: 1000 * 60 * 30,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
};

export const removePhotos = async ({
  conds,
  search,
  pagination,
}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, search, pagination },
      query: `
        mutation(
          $conds: PhotoSearch!,
          $search: PhotoSearch,
          $pagination: Pagination
        ){
          removePhotos(
            conds: $conds,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 }
          ){
            list {
              id
              url
              type
              name
              creationTime
              sourceFileName
            }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.removePhotos;
};
