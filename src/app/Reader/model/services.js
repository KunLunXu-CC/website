import axios from '@utils/request';

export const getArticles = async () => {
  const res = await axios({
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      query: `
        query (
          $pagination: Pagination
          $search: ArticleSearch
        ) {
          articles(
            search: $search
            pagination: $pagination
          ) {
            list {
              id
              type
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
  return _.get(res, 'data.data.articles.list') || [];
};

export const space = {};
