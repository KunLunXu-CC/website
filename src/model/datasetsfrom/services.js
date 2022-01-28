import axios from '@utils/request';

// 基础字段: 请返回数据基础字段
const BASE_FIELD = 'id value code desc icon name';

// 获取字典
// TODO: 临时删除排序, 后面再考虑是否添加 variables: { search, orderBy: { value: -1 } }
export const getDatasetsfroms = axios({
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
  getRes: (res) => res.datasetsfroms ?? {},
});

export const space = {};
