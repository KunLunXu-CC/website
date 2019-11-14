import _ from 'lodash';
import axios from '@utils/request';

export const getPhotos = async ({ pagination, search }) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination },
      query: `
        query($search: PhotoSearch, $pagination: Pagination){
          photos( search: $search, pagination: $pagination, orderBy: { creationTime: -1 } ){
            list { id name sourceFileName url type creationTime }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.photos;
};

export const uploadPhotos = async ({ files, type, payload }) => {
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

export const removePhotos = async ({ conds, body, search, pagination }) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, body, search, pagination },
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
            list { id name sourceFileName url type creationTime }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.removePhotos;
};
