import axios from '@utils/request';

// 基础字段: 请返回数据基础字段
const BASE_FIELD = 'id value code desc icon name';

// 获取字典
export const getDatasetsfroms = async ({
  spin,
  search,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, orderBy: { value: -1 } },
      query: `
        query(
          $orderBy: OrderBy
          $pagination: Pagination
          $search: DatasetsfromSearch
        ){
          datasetsfroms(
            search: $search,
            orderBy: $orderBy,
            pagination: $pagination,
          ){
            list {
              ${BASE_FIELD}
              parent {
                ${BASE_FIELD}
              }
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.datasetsfroms') || {};
};

export const space = {};
