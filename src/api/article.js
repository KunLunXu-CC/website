import axios from '@utils/request';

export const getArticles = async ({ pagination, search } = {}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination },
      query: `
        query($search: ArticleSearch, $pagination: Pagination){
          articles( search: $search, pagination: $pagination, orderBy: { creationTime: -1 } ){
            list { id name desc thumb content tags { id name } updateTime }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.articles;
};

export const createArticles = async ({ body, search, pagination } = {}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body, search, pagination },
      query: `
        mutation(
          $body: [AticleFields!]!,
          $search: ArticleSearch,
          $pagination: Pagination
        ){
          createArticles(
            body: $body,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 }
          ){
            list { id name desc thumb content tags { id name } }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.createArticles;
};

export const updateArticles = async ({ conds, body, search, pagination } = {}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, body, search, pagination },
      query: `
        mutation(
          $conds: ArticleSearch!,
          $body: AticleFields!,
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
            list { id name desc thumb content tags { id name } }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.updateArticles;
};

export const removeArticles = async ({ conds, body, search, pagination } = {}) => {
  const res = await axios({
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
            list { id name desc thumb content tags { id name } }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.removeArticles;
};
