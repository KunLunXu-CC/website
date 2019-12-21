import axios from '@utils/request';

export const getTags = async ({
  search,
  pagination,
} = {}) => {
  const res = await axios({
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
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.tags;
};

export const createTags = async ({
  body,
  search,
  pagination,
} = {}) => {
  const res = await axios({
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
            rescode
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.createTags;
};

export const updateTags = async ({
  body,
  conds,
  search,
  pagination,
} = {}) => {
  const res = await axios({
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
            rescode
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.updateTags;
};

export const removeTags = async ({
  body,
  conds,
  search,
  pagination,
} = {}) => {
  const res = await axios({
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
            rescode
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.removeTags;
};
