import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { ARTICLE_STATUS } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';
import {
  THUMB_SETTING,
  REVOKE_CONFIRM,
  RELEASE_CONFIRM,
} from '../../Modal/consts';

const useStateHook = () => {
  const dispatch = useDispatch();

  const { articles, selected } = useSelector(state => ({
    articles: _.get(state, 'editor.articles'),
    selected: _.get(state, 'editor.menu.selected'),
  }));

  const action = useMemo(
    () => (articles.find(v => v.id === selected)),
    [articles, selected]
  );

  // 当前文章是否是未发布状态
  const unpublished = useMemo(
    () => (_.get(action, 'status') !== ARTICLE_STATUS.RELEASE),
    [action]
  );

  // 发布
  const onRelease = () => {
    dispatch({
      article: action.id,
      type: 'modal/openModal',
      code: RELEASE_CONFIRM,
    });
  };

  // 撤销(下架)
  const onRevoke = () => {
    dispatch({
      article: action.id,
      type: 'modal/openModal',
      code: REVOKE_CONFIRM,
    });
  };

  // 缩略图配置
  const thumbSetting = () => {
    dispatch({
      article: action.id,
      type: 'modal/openModal',
      code: THUMB_SETTING,
    });
  };

  return { onRelease, unpublished, onRevoke, thumbSetting };
};

export default () => {
  const state = useStateHook();

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
