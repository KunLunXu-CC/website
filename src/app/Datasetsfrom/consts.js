import { DATASETSFROM_CODE } from '@config/consts';

export const MENU_LIST = [
  {
    key: 'all',
    label: '全部',
    icon: 'icon-all',
  },
  ... Object.values(DATASETSFROM_CODE).map(v => ({
    key: v.VALUE,
    icon: v.ICON,
    label: v.DESC,
  })),
];

// 编辑弹窗 code
export const MODAL_CODE_DATASETSFROM_EDITOR = 'MODAL_CODE_DATASETSFROM_EDITOR';
