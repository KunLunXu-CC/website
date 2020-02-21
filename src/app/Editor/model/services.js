import axios from '@utils/request';

export const getTags = async ({
  spin,
  search,
  pagination,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination },
      query: `
        query(
          $search: TagSearch,
          $pagination: Pagination
        ){
          tags(
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 }
          ){
            list {
              id
              name
              icon
              color
              status
              updateTime
              parent { id name }
            }
            pagination
            message
          }
        }`,
    },
  });
  return _.get(res, 'data.data.tags.list');
};

export const getArticles = async ({
  spin,
  search,
  pagination,
  orderBy = { creationTime: -1 },
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination, orderBy },
      query: `
        query(
          $orderBy: OrderBy,
          $search: ArticleSearch,
          $pagination: Pagination,
        ){
          articles(
            search: $search,
            orderBy: $orderBy,
            pagination: $pagination,
          ){
            list {
              id
              name
              desc
              thumb
              status
              content
              viewCount
              updateTime
              tags { id name }
            }
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.articles.list');
};

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
          $search: TagSearch,
          $pagination: Pagination,
        ){
          removeTags(
            conds: $conds,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              name
              icon
              color
              status
              updateTime
              parent { id name }
            }
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removeTags.list');
};


export const createTags = async ({
  spin,
  body,
  search,
  pagination,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body, search, pagination },
      query: `
        mutation(
          $search: TagSearch,
          $body: [TagFields!]!,
          $pagination: Pagination,
        ){
          createTags(
            body: $body,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              icon
              name
              color
              status
              updateTime
              parent { id name }
            }
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createTags.list');
};

export const updateTags = async ({
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
          $body: TagFields!,
          $conds: TagSearch!,
          $search: TagSearch,
          $pagination: Pagination,
        ){
          updateTags(
            body: $body,
            conds: $conds,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              name
              icon
              color
              status
              updateTime
              parent { id name }
            }
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateTags.list');
};


export const createArticles = async ({
  spin,
  body,
  search,
  pagination,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body, search, pagination },
      query: `
        mutation(
          $search: ArticleSearch,
          $body: [AticleFields!]!,
          $pagination: Pagination
        ){
          createArticles(
            body: $body,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 }
          ){
            list {
              id
              name
              desc
              thumb
              status
              content
              viewCount
              tags { id name }
            }
            change {
              id
            }
            pagination
            message
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createArticles') || {};
};

export const updateArticles = async ({
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
          $body: AticleFields!,
          $conds: ArticleSearch!,
          $search: ArticleSearch,
          $pagination: Pagination
        ){
          updateArticles(
            body: $body,
            conds: $conds,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 }
          ){
            list {
              id
              name
              desc
              thumb
              status
              content
              viewCount
              tags { id name }
            }
            pagination
            message
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateArticles.list');
};

export const removeArticles = async ({
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
          $conds: ArticleSearch!,
          $search: ArticleSearch,
          $pagination: Pagination
        ){
          removeArticles(
            conds: $conds,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 }
          ){
            list {
              id
              name
              desc
              thumb
              status
              content
              viewCount
              tags { id name }
            }
            pagination
            message
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removeArticles.list');
};

// 发布
export const releaseArticles = async ({
  spin,
  conds,
  search,
  pagination,
  orderBy = { creationTime: -1 },
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, conds, pagination, orderBy },
      query: `
        mutation(
          $orderBy: OrderBy,
          $search: ArticleSearch,
          $conds: ArticleSearch!,
          $pagination: Pagination,
        ){
          releaseArticles(
            conds: $conds,
            search: $search,
            orderBy: $orderBy,
            pagination: $pagination,
          ){
            list {
              id
              name
              desc
              thumb
              status
              content
              viewCount
              updateTime
              tags { id name }
            }
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.releaseArticles.list');
};

// 撤销(取消发布)
export const revokeArticles = async ({
  spin,
  conds,
  search,
  pagination,
  orderBy = { creationTime: -1 },
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, conds, pagination, orderBy },
      query: `
        mutation(
          $orderBy: OrderBy,
          $search: ArticleSearch,
          $conds: ArticleSearch!,
          $pagination: Pagination,
        ){
          revokeArticles(
            conds: $conds,
            search: $search,
            orderBy: $orderBy,
            pagination: $pagination,
          ){
            list {
              id
              name
              desc
              thumb
              status
              content
              viewCount
              updateTime
              tags { id name }
            }
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.revokeArticles.list');
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
