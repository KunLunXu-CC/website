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
} from '../../consts';

const useStateHook = () => {
  const dispatch = useDispatch();

  const { articles, works } = useSelector((state) => ({
    works: _.get(state, 'editor.works'),
    articles: _.get(state, 'editor.articles'),
  }));

  // 文章内容
  const article = useMemo(() => (
    articles[_.get(works.find((v) => v.action), 'article')]
  ));

  // 当前文章是否是未发布状态
  const unpublished = useMemo(
    () => (_.get(article, 'status') !== ARTICLE_STATUS.RELEASE),
    [article],
  );

  // 预览
  const onPreview = () => {
    dispatch({
      preview: article.id,
      type: 'editor/setPreview',
    });
  };

  // 发布
  const onRelease = () => {
    dispatch({
      article,
      code: RELEASE_CONFIRM,
      type: 'modal/openModal',
    });
  };

  // 撤销(下架)
  const onRevoke = () => {
    dispatch({
      article,
      code: REVOKE_CONFIRM,
      type: 'modal/openModal',
    });
  };

  // 缩略图配置
  const thumbSetting = () => {
    dispatch({
      article,
      code: THUMB_SETTING,
      type: 'modal/openModal',
    });
  };

  return {
    onRevoke,
    onRelease,
    onPreview,
    unpublished,
    thumbSetting,
  };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.extra}>
      <Icon
        type="icon-yulan"
        onClick={state.onPreview}
        className={scss['icon-preview']}
      />
      <Icon
        type="icon-genghuanfengmian"
        onClick={state.thumbSetting}
        className={scss['icon-thumbnail']}
      />
      {state.unpublished ? (
        <Icon
          type="icon-fabu"
          onClick={state.onRelease}
          className={scss['icon-release']}
        />
      ) : (
        <Icon
          type="icon-xiajia"
          onClick={state.onRevoke}
          className={scss['icon-lower-shelf']}
        />
      )}
    </div>
  );
};
