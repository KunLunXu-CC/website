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
  return res.data.data.tags;
};

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
              color
              status
              updateTime
              parent { id name }
            }
            message
          }
        }`,
    },
  });
  return res.data.data.tagsWithArticles;
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
  return res.data.data.createTags;
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
  return res.data.data.updateTags;
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
  return res.data.data.removeTags;
};
