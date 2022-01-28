import axios from '@utils/request';

// 基础字段: 请返回数据基础字段
const BASE_FIELD = 'id value code desc icon name';

// 创建字典
export const createDatasetsfroms = axios({
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
  getRes: (res) => res.createDatasetsfroms ?? {},
});

// 更新字典
export const updateDatasetsfroms = axios({
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
  getRes: (res) => res.updateDatasetsfroms ?? {},
});

// 删除字典
export const removeDatasetsfroms = axios({
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
  getRes: (res) => res.removeDatasetsfroms ?? {},
});
