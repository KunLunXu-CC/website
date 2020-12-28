import axios from '@utils/request';

export const getArticles = async ({ search, pagination }) => {
  const res = await axios({
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination },
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
              updateTime
              tags { id name }
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.articles.list') || [];
};

export const space = {};
