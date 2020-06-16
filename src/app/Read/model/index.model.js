import effects from './effects';
import * as reducers from './reducers';
import { DATASETSFROM_CODE } from '@config/consts';

const initState = {
  menu: {
    firstActiveKey: null,  // 一级菜单 activeKey
    secondActiveKey: null,  // 二级菜单 activeKey
  },
  editor: {
    show: false,   // 是否开启
    current: null, // 当前数据
  },
  listData: {
    [DATASETSFROM_CODE.SNIPPETS_TAG.VALUE]: [],
    [DATASETSFROM_CODE.INTERVIEW_TAG.VALUE]: [],
    [DATASETSFROM_CODE.ALGORITHM_TAG.VALUE]: [],
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'read',
};
