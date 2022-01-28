import axios from '@utils/request';

export const getArticles = axios({
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
  getRes: (res) => res.articles?.list ?? [],
});

export const space = {};
