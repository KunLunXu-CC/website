import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import { Icon } from 'qyrc';
import { useStore } from '../../store';
import { ARTICLE_STATUS } from '@config/consts';
import {
  THUMB_SETTING,
  REVOKE_CONFIRM,
  RELEASE_CONFIRM,
} from '../../Modal/consts';
import scss from './index.module.scss';

const useStateHook = store => {
  // 发布
  const onRelease = () => {
    store.global.modal.open({
      code: RELEASE_CONFIRM,
    });
  };

  // 撤销(下架)
  const onRevoke = () => {
    store.global.modal.open({
      code: REVOKE_CONFIRM,
    });
  };

  // 缩略图配置
  const thumbSetting = () => {
    store.global.modal.open({
      code: THUMB_SETTING,
    });
  };

  // 当前文章是否是未发布状态
  const unpublished = useMemo(() => (
    _.get(store.article.action, 'article.status') !== ARTICLE_STATUS.RELEASE
  ), [store.article.action]);

  return { onRelease, unpublished, onRevoke, thumbSetting };
};

export default () => {
  const store = useStore();
  const state = useStateHook(store);
  return (
    <div className={scss.extra}>
      <Icon
        type="icon-yulan"
        className={scss['icon-preview']}
      />
      <Icon
        type="icon-genghuanfengmian"
        onClick={state.thumbSetting}
        className={scss['icon-thumbnail']}
      />
      {state.unpublished ?
        <Icon
          type="icon-fabu"
          onClick={state.onRelease}
          className={scss['icon-release']}
        /> :
        <Icon
          type="icon-xiajia"
          onClick={state.onRevoke}
          className={scss['icon-lower-shelf']}
        />
      }
    </div>
  );
};
