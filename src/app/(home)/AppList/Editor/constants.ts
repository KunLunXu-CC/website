import Search from './SideBar/Search';
import Resource from './SideBar/Resource';
import { FC } from 'react';
import { ACTIVITY_BAR_KEY } from './types';
import { APP_SETTING } from '@/config/constants';

export const NEW_FLAG_ID = 'new'; // 新建文件夹、新建文章占位 ID

// 弹窗类型常量 - 发布
export const RELEASE_CONFIRM = 'EDITOR_RELEASE_CONFIRM';

// 弹窗类型常量 - 撤销
export const REVOKE_CONFIRM = 'EDITOR_REVOKE_CONFIRM';

// 弹窗类型常量 - 缩略图配置
export const THUMB_SETTING = 'EDITOR_THUMB_SETTING';

// 弹窗类型常量 - 移动文章
export const MOVE = 'EDITOR_MOVE';

// 活动栏列表(最左侧)
export const ACTIVITY_BAR_LIST = [
  {
    key: ACTIVITY_BAR_KEY.RESOURCE,
    title: '资源管理器',
    status: null,
    icon: 'icon-all',
    sideBar: Resource,
  },
  {
    key: ACTIVITY_BAR_KEY.SEARCH,
    title: '查找',
    icon: 'icon-search',
    sideBar: Search,
  },
] as { key: ACTIVITY_BAR_KEY; title: string; icon: string; sideBar: FC<any> }[];

// message 配置
export const MESSAGE_CONFIG = {
  bottom: 10,
  placement: 'bottomRight',
  code: APP_SETTING.EDITOR.code,
};
