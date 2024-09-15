import classNames from 'classnames';
import scss from './tab.module.scss';
import useArticle from '../hooks/useArticle';
import useWorkspaceStore from '../hooks/useWorkspaceStore';

import { IWorkspace } from '../types';
import { Icon } from '@kunlunxu/brick';
import { FC, memo, useMemo } from 'react';

interface ITabProps {
  workspace: IWorkspace;
}

const Tab: FC<ITabProps> = (props) => {
  const { workspace } = props;

  const { removeWorkspace } = useWorkspaceStore();
  const { article } = useArticle({ articleId: workspace.dataId });

  // icon className
  const iconClassName = useMemo(
    () =>
      classNames(scss['tab-icon'], {
        [scss['tab-icon-change']]: workspace.change,
      }),
    [workspace.change],
  );

  return (
    <span className={scss.tab}>
      {article!.name}
      <Icon
        type="icon-guanbi6"
        className={iconClassName}
        onClick={removeWorkspace.bind(null, article!.id)}
      />
    </span>
  );
};

export default memo(Tab);
