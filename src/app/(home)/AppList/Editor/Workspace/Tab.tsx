import clsx from 'clsx';
import scss from './tab.module.scss';
import useArticle from '../hooks/useArticle';
import useWorkspaceStore from '../hooks/useWorkspaceStore';

import { IWorkspace } from '../types';
import { Icon } from '@kunlunxu/brick';
import { FC, memo, useCallback, MouseEvent } from 'react';

interface ITabProps {
  workspace: IWorkspace;
}

const Tab: FC<ITabProps> = (props) => {
  const { workspace } = props;

  const { removeWorkspace } = useWorkspaceStore();
  const { article } = useArticle({ articleId: workspace.dataId });

  const handleClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!article) return;

      removeWorkspace(article.id);
    },
    [article, removeWorkspace],
  );

  if (!article) return null;

  return (
    <span className={scss.tab}>
      {article.name}
      <Icon
        type="icon-guanbi6"
        onClick={handleClose}
        className={clsx(scss['tab-icon'], {
          [scss['tab-icon-change']]: workspace.change,
        })}
      />
    </span>
  );
};

export default memo(Tab);
