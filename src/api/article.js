import axios from '@utils/request';

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
  return res.data.data.articles;
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
            pagination
            message
          }
        }`,
    },
  });
  return res.data.data.createArticles;
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
  return res.data.data.updateArticles;
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
  return res.data.data.removeArticles;
};

// 发布
export const releaseArticle = async ({
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
          releaseArticle(
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
  return res.data.data.releaseArticle;
};

// 撤销(取消发布)
export const revokeArticle = async ({
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
          revokeArticle(
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
  return res.data.data.revokeArticle;
};
