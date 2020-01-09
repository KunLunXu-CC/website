import axios from '@utils/request';

export const getDiaries = async ({
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
          $search: DiarySearch,
          $pagination: Pagination
        ){
          diaries(
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 }
          ){
            list {
              id
              name
              bill
              diet
              getUp
              toRest
              fitness
              bodyIndex
              informalEssay
            }
            pagination
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.diaries;
};

export const createDiaries = async ({
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
          $search: DiarySearch,
          $body: [DiaryFields!]!,
          $pagination: Pagination,
        ){
          createDiaries(
            body: $body,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              name
              bill
              diet
              getUp
              toRest
              fitness
              bodyIndex
              informalEssay
            }
            rescode
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.createDiaries;
};

export const updateDiaries = async ({
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
          $body: DiaryFields!,
          $conds: DiarySearch!,
          $search: DiarySearch,
          $pagination: Pagination,
        ){
          updateDiaries(
            body: $body,
            conds: $conds,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              name
              bill
              diet
              getUp
              toRest
              fitness
              bodyIndex
              informalEssay
            }
            rescode
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.updateDiaries;
};

export const removeDiaries = async ({
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
          $conds: DiarySearch!,
          $search: DiarySearch,
          $pagination: Pagination,
        ){
          removeDiaries(
            conds: $conds,
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              name
              bill
              diet
              getUp
              toRest
              fitness
              bodyIndex
              informalEssay
            }
            rescode
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.removeDiaries;
};
