import axios from '@utils/request';

// 查询所有标签下具有文章的标签列表
export const getTagsWithArticles = async ({
  spin,
  search,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query(
          $search: ArticleSearch,
        ){
          tagsWithArticles(
            search: $search,
            orderBy: { creationTime: -1 }
          ){
            list {
              id
              name
              icon
              parent { id name }
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.tagsWithArticles.list');
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
              content
              viewCount
              updateTime
              tags { id name }
            }
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.articles.list');
};
