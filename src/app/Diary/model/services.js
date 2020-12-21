import axios from '@utils/request';

const DIARY = `{
  id
  name
  getUp
  toRest
  informalEssay
  diet {
    type { value name desc }
    desc
  }
  fitness {
    type { value name desc }
    place { value name desc }
  }
  bill {
    desc
    income
    expend
    tag { value name desc }
  }
  bodyIndex { weight muscle moistureContent bodyfat bim }
}`;

// 获取日记
export const getDiaries = async ({
  spin,
  search,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: DiarySearch){
          diaries(search: $search){
            list ${DIARY}
          }
        }`,
    },
  });
  return _.get(res, 'data.data.diaries.list');
};

// 创建日记
export const createDiaries = async ({
  spin,
  body,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body },
      query: `
        mutation($body: [DiaryFields!]!){
          createDiaries(body: $body){
            change ${DIARY}
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createDiaries') || {};
};

// 更新日记
export const updateDiaries = async ({
  spin,
  body,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds, body },
      query: `
        mutation($body: DiaryFields!, $conds: DiarySearch!){
          updateDiaries(body: $body, conds: $conds){
            change ${DIARY}
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateDiaries') || {};
};

// 获取账单统计
export const getStatsBill = async ({
  spin,
  search,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: StatsBillSearch){
          statsBill(search: $search){
            stats { income expend }
            groupWithName {
              name
              income
              expend
              diaries {
                name
                bill {
                  desc
                  income
                  expend
                  tag { value name desc }
                }
              }
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.statsBill') || {};
};

// 获取 bodyIndex 列表
export const getStatsBodyIndex = async ({
  spin,
  search,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: DiarySearch){
          diaries(search: $search){
            list {
              name
              bodyIndex { weight muscle moistureContent bodyfat bim }
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.diaries.list');
};
