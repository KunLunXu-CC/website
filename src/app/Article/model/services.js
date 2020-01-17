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

export const space = () => {};
