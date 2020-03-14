import axios from '@utils/request';

// 初始化: 一次性获取所有数据并在前端进行存储
export const initData = async () => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      query: `
        query {
          tags {
            list {
              id
              name
              parent { id name }
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
    },
  });
  return {
    tags: _.get(res, 'data.data.tags.list') || [],
    articles: _.get(res, 'data.data.articles.list') || [],
  };
};

// 移除 tag
export const removeTags = async ({
  spin,
  body,
  conds,
  search,
  pagination,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, body, search, pagination },
      query: `
        mutation(
          $conds: TagSearch!,
        ){
          removeTags(
            conds: $conds,
          ){
            change {
              id
              name
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removeTags') || {};
};

// 创建 tag
export const createTags = async ({
  spin,
  body,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body },
      query: `
        mutation(
          $body: [TagFields!]!,
        ){
          createTags(
            body: $body,
          ){
            change {
              id
              name
              parent { id name }
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createTags') || {};
};

// 编辑标签
export const updateTags = async ({
  spin,
  body,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, body },
      query: `
        mutation(
          $body: TagFields!,
          $conds: TagSearch!,
        ){
          updateTags(
            body: $body,
            conds: $conds,
          ){
            change {
              id
              name
              parent { id name }
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateTags') || {};
};

// 创建文章
export const createArticles = async ({
  spin,
  body,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body },
      query: `
        mutation(
          $body: [AticleFields!]!,
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
    },
  });
  return _.get(res, 'data.data.createArticles') || {};
};

// 更新文章
export const updateArticles = async ({
  spin,
  body,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, body },
      query: `
        mutation(
          $body: AticleFields!,
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
    },
  });
  return _.get(res, 'data.data.updateArticles') || {};
};

// 删除文章
export const removeArticles = async ({
  spin,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds },
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
    },
  });
  return _.get(res, 'data.data.removeArticles') || {};
};

// 发布
export const releaseArticles = async ({
  spin,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds },
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
    },
  });
  return _.get(res, 'data.data.releaseArticles') || {};
};

// 撤销(取消发布)
export const revokeArticles = async ({
  spin,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds },
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
    },
  });
  return _.get(res, 'data.data.revokeArticles') || {};
};

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
  files.forEach(v => (formData.append('file', v)));

  const res = await axios({
    spin,
    data: formData,
    method: 'post',
    url: '/photo/upload',
    timeout: 1000 * 60 * 30,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return _.get(res, 'data.data');
};
