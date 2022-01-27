import axios from '@utils/request';

// 基础字段: 请返回数据基础字段
const BASE_FIELD = 'id value code desc icon name';

// 创建字典
export const createDatasetsfroms = async ({
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
        mutation(
          $body: [DatasetsfromFields!]!,
        ){
          createDatasetsfroms(
            body: $body,
          ){
            change {
              ${BASE_FIELD}
              parent {
                ${BASE_FIELD}
              }
            }
          }
        }`,
    },
  });

  return res?.data?.data?.createDatasetsfroms ?? {};
};

// 更新字典
export const updateDatasetsfroms = async ({
  spin,
  body,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body, conds },
      query: `
        mutation(
          $body: DatasetsfromFields!
          $conds: DatasetsfromSearch!
        ){
          updateDatasetsfroms(
            body: $body,
            conds: $conds,
          ){
            change {
              ${BASE_FIELD}
              parent {
                ${BASE_FIELD}
              }
            }
          }
        }`,
    },
  });

  return res?.data?.data?.updateDatasetsfroms ?? {};
};

// 删除字典
export const removeDatasetsfroms = async ({
  spin,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds },
      query: `
        mutation(
          $conds: DatasetsfromSearch!
        ){
          removeDatasetsfroms(
            conds: $conds,
          ){
            change {
              ${BASE_FIELD}
              parent {
                ${BASE_FIELD}
              }
            }
          }
        }`,
    },
  });

  return res?.data?.data?.removeDatasetsfroms ?? {};
};
