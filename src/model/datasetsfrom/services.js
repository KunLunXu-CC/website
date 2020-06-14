import axios from '@utils/request';

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
      variables: { search, OrderBy: { value: -1 } },
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
              id
              value
              code
              desc
              name
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.datasetsfroms') || {};
};

export const space = {};
