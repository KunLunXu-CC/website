import axios from '@utils/request';

// 获取日记
export const getDiaries = async ({
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
          $search: DiarySearch,
        ){
          diaries(
            search: $search,
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
          }
        }`,
    },
  });
  return _.get(res, 'data.data.diaries.list');
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
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createDiaries.list');
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
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateDiaries.list');
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
            message
            pagination
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removeDiaries.list');
};
