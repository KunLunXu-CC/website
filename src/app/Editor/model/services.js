import axios from '@utils/request';
import { DATASETSFROM_CODE } from '@config/consts';

// 初始化: 一次性获取所有数据并在前端进行存储
export const initData = axios({
  query: `
    query {
      datasetsfroms(
        search: { code: [
          ${DATASETSFROM_CODE.ARTICLE_TAG.VALUE}
        ]},
      ){
        list {
          id value code desc icon name
          parent {
            id value code desc icon name
          }
        }
      }
      articles {
        list {
          id
          name
          thumb
          status
          content
          tags { id name }
        }
      }
    }`,
  getRes: (res) => ({
    tags: res.datasetsfroms?.list ?? [],
    articles: res.articles?.list ?? [],
  }),
});

// 创建字典
export const createDatasetsfroms = axios({
  query: `
    mutation(
      $body: [DatasetsfromFields!]!,
    ){
      createDatasetsfroms(
        body: $body,
      ){
        change {
          id value code desc icon name
          parent {
            id value code desc icon name
          }
        }
      }
    }`,
  getRes: (res) => res.createDatasetsfroms ?? {},
});

// 删除字典
export const removeDatasetsfroms = axios({
  query: `
    mutation(
      $conds: DatasetsfromSearch!
    ){
      removeDatasetsfroms(
        conds: $conds,
      ){
        change {
          id value code desc icon name
          parent {
            id value code desc icon name
          }
        }
      }
    }`,
  getRes: (res) => res.removeDatasetsfroms ?? {},
});

// 创建文章
export const createArticles = axios({
  query: `
    mutation(
      $body: [ArticleFields!]!,
    ){
      createArticles(
        body: $body,
      ){
        change {
          id
          name
          tags { id name }
        }
      }
    }`,
  getRes: (res) => res.createArticles ?? {},
});

// 更新文章
export const updateArticles = axios({
  query: `
    mutation(
      $body: ArticleFields!,
      $conds: ArticleSearch!,
    ){
      updateArticles(
        body: $body,
        conds: $conds,
      ){
        change {
          id
          name
          content
          thumb
          status
          tags { id name }
        }
      }
    }`,
  getRes: (res) =>  res.updateArticles ?? {},
});

// 删除文章
export const removeArticles = axios({
  query: `
    mutation(
      $conds: ArticleSearch!
    ){
      removeArticles(
        conds: $conds,
      ){
        change {
          id
          name
        }
      }
    }`,
  getRes: (res) => res.removeArticles ?? {},
});

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
          tags { id name }
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
          tags { id name }
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
