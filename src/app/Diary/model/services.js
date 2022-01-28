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
export const getDiaries = axios({
  query: `
    query($search: DiarySearch){
      diaries(search: $search){
        list ${DIARY}
      }
    }`,
  getRes: (res) => res.diaries?.list ?? [],
});

// 创建日记
export const createDiaries = axios({
  query: `
    mutation($body: [DiaryFields!]!){
      createDiaries(body: $body){
        change ${DIARY}
      }
    }`,
  getRes: (res) => res.createDiaries ?? {},
});

// 更新日记
export const updateDiaries = axios({
  query: `
    mutation($body: DiaryFields!, $conds: DiarySearch!){
      updateDiaries(body: $body, conds: $conds){
        change ${DIARY}
      }
    }`,
  getRes: (res) => res.updateDiaries ?? {},
});

// 获取账单统计
export const getStatsBill = axios({
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
  getRes: (res) => res.statsBill ?? {},
});

// 获取 bodyIndex 列表
export const getStatsBodyIndex = axios({
  query: `
    query($search: DiarySearch){
      diaries(search: $search){
        list {
          name
          bodyIndex { weight muscle moistureContent bodyfat bim }
        }
      }
    }`,
  getRes: (res) => res.diaries?.list ?? [],
});
