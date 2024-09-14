import scss from './tabBarExtra.module.scss';

import { memo, useCallback } from 'react';
import { Icon } from '@kunlunxu/brick';

const TabBarExtra = () => {
  // const { article } = useArticle();

  // 当前文章是否是未发布状态
  // const unpublished = useMemo(() => article?.status !== ARTICLE_STATUS.RELEASE, [article]);
  const unpublished = false;

  // 发布
  const handleRelease = useCallback(() => {}, []);

  // 撤销(下架)
  const handleRevoke = useCallback(() => {}, []);

  // 缩略图配置
  const thumbSetting = useCallback(() => {}, []);

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

export default memo(TabBarExtra);
