import axios from '@utils/request';

// 发布
export const releaseArticles = axios({
  query: `
    mutation(
      $conds: ArticleSearch!,
    ){
      releaseArticles(
        conds: $conds,
      ){
        change {
          id
          name
          content
          thumb
          status
          folders { id name }
        }
      }
    }`,
  getRes: (res) => res.releaseArticles ?? {},
});

// 撤销(取消发布)
export const revokeArticles = axios({
  query: `
    mutation(
      $conds: ArticleSearch!,
    ){
      revokeArticles(
        conds: $conds,
      ){
        change {
          id
          name
          content
          thumb
          status
          folders { id name }
        }
      }
    }`,
  getRes: (res) => res.revokeArticles ?? {},
});

// 图片上传
export const uploadPhotos = async ({
  spin,
  type,
  files,
  payload,
}) => {
  const formData = new FormData();
  payload && formData.append('payload', payload);
  _.isFinite(type) && formData.append('type', type);
  files.forEach((v) => (formData.append('file', v)));

  const res = await axios({
    spin,
    data: formData,
    method: 'post',
    url: '/photo/upload',
    timeout: 1000 * 60 * 30,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res?.data?.data;
};
