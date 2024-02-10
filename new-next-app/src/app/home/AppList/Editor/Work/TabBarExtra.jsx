import scss from './tabBarExtra.module.scss';

import { useCallback, useMemo } from 'react';
import { actions } from '@/store';
import { Icon } from '@kunlunxu/brick';
import { ARTICLE_STATUS } from '@/config/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  THUMB_SETTING,
  REVOKE_CONFIRM,
  RELEASE_CONFIRM,
} from '@/app/home/AppList/Editor/constants';

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
  const handleRelease = useCallback(() => {
    dispatch(actions.modal.open({ code: RELEASE_CONFIRM, article }));
  }, [article, dispatch]);

  // 撤销(下架)
  const handleRevoke = useCallback(() => {
    dispatch(actions.modal.open({ code: REVOKE_CONFIRM, article }));
  }, [article, dispatch]);

  // 缩略图配置
  const thumbSetting = useCallback(() => {
    dispatch({
      article,
      code: THUMB_SETTING,
      type: 'modal/openModal',
    });
  }, [article, dispatch]);

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
