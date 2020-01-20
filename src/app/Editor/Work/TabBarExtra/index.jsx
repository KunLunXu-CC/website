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

  const { articles, works } = useSelector(state => ({
    works: _.get(state, 'editor.works'),
    articles: _.get(state, 'editor.articles'),
  }));

  const article = useMemo(() => {
    const id = _.get(works.find(v => v.action), 'article');
    return articles.find(v => v.id === id);
  }, [articles, works]);

  // 当前文章是否是未发布状态
  const unpublished = useMemo(
    () => (_.get(article, 'status') !== ARTICLE_STATUS.RELEASE),
    [article]
  );

  // 发布
  const onRelease = () => {
    dispatch({
      article,
      type: 'modal/openModal',
      code: RELEASE_CONFIRM,
    });
  };

  // 撤销(下架)
  const onRevoke = () => {
    dispatch({
      article,
      type: 'modal/openModal',
      code: REVOKE_CONFIRM,
    });
  };

  // 缩略图配置
  const thumbSetting = () => {
    dispatch({
      article,
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
