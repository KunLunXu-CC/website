import scss from './index.module.scss';

import { useMemo } from 'react';
import { Icon } from '@kunlunxu/brick';
import { ARTICLE_STATUS } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';
import {
  THUMB_SETTING,
  REVOKE_CONFIRM,
  RELEASE_CONFIRM,
} from '../../consts';

export default () => {
  const dispatch = useDispatch();

  const { articles, works } = useSelector((state) => ({
    works: state.editor?.works,
    articles: state.editor?.articles,
  }));

  // 文章内容
  const article = useMemo(() => (
    articles[works.find((v) => v.active)?.articleId]
  ), [articles, works]);

  // 当前文章是否是未发布状态
  const unpublished = useMemo(
    () => article?.status !== ARTICLE_STATUS.RELEASE,
    [article],
  );

  // 发布
  const handleRelease = () => {
    dispatch({
      article,
      code: RELEASE_CONFIRM,
      type: 'modal/openModal',
    });
  };

  // 撤销(下架)
  const handleRevoke = () => {
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

  return (
    <div className={scss.extra}>
      <Icon
        onClick={thumbSetting}
        type="icon-genghuanfengmian"
        className={scss['icon-thumbnail']}
      />
      {unpublished ? (
        <Icon
          type="icon-fabu"
          onClick={handleRelease}
          className={scss['icon-release']}
        />
      ) : (
        <Icon
          type="icon-xiajia"
          onClick={handleRevoke}
          className={scss['icon-lower-shelf']}
        />
      )}
    </div>
  );
};
