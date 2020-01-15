
import _ from 'lodash';
import axios from '@utils/request';

/**
 * 上传文件
 */
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


/**
 * 获取所有图片: 桌面、缩略图、头像
 * @return {Objject[]} 返回查询到的列表数据
 */
export const getPhotos = async ({ search }) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: PhotoSearch){
          photos(search: $search){
            list {
              id
              url
              type
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.photos.list') || [];
};

/**
 * 移除图片
 */
export const removePhotos = async ({
  conds,
  search,
}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, search },
      query: `
        mutation(
          $conds: PhotoSearch!,
          $search: PhotoSearch,
        ){
          removePhotos(
            conds: $conds,
            search: $search,
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
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removePhotos.list') || [];
};
