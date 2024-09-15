import clsx from 'clsx';
import scss from './tab.module.scss';
import useArticle from '../hooks/useArticle';
import useWorkspaceStore from '../hooks/useWorkspaceStore';

import { FC, memo } from 'react';
import { IWorkspace } from '../types';
import { Icon } from '@kunlunxu/brick';

interface ITabProps {
  workspace: IWorkspace;
}

const Tab: FC<ITabProps> = (props) => {
  const { workspace } = props;

  const { removeWorkspace } = useWorkspaceStore();
  const { article } = useArticle({ articleId: workspace.dataId });

  if (!article) return null;

  return (
    <span className={scss.tab}>
      {article.name}
      <Icon
        type="icon-guanbi6"
        className={clsx(scss['tab-icon'], {
          [scss['tab-icon-change']]: workspace.change,
        })}
        onClick={removeWorkspace.bind(null, article.id)}
      />
    </span>
  );
};

export default memo(Tab);
