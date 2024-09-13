import clsx from 'clsx';
import More from './More';
import scss from './title.module.scss';
import useCreateArticle from '../../hooks/useCreateArticle';
import useCreateFolder from '../../hooks/useCreateFolder';
import useUpdateFolder from '../../hooks/useUpdateFolder';
import useUpdateArticle from '../../hooks/useUpdateArticle';

import { Icon } from '@kunlunxu/brick';
import { Input } from '@nextui-org/react';
import { IResourceItem } from '../../types';
import { useMemo, useCallback, KeyboardEvent, memo, FocusEvent } from 'react';

interface ITitleProps {
  data: IResourceItem;
}

const Title = (props: ITitleProps) => {
  const { data } = props;
  const isFolder = useMemo(() => !data.folder, [data.folder]);

  const { updateFolder } = useUpdateFolder();
  const { createFolders } = useCreateFolder();
  const { createArticle } = useCreateArticle();
  const { updateArticle } = useUpdateArticle();

  // 编辑数据: 根据不同 id、type 设置不同 dispatch 参数
  const handleEdit = useCallback(
    (name: string) => {
      const isNew = data.id === 'new';
      switch (true) {
        case isFolder && isNew: // 新建 - 文件夹
          createFolders({ name, parentId: data.parent?.id });
          break;
        case !isFolder && isNew: // 新建 - 文章
          createArticle({ name, folderId: data.folder?.id });
          break;
        case isFolder && !isNew: // 编辑 - 文件夹
          updateFolder({ id: data.id, name });
          break;
        case !isFolder && !isNew: // 编辑 - 文章
          updateArticle({ id: data.id, name });
          break;
      }
    },
    [data, isFolder, updateArticle, createFolders, createArticle, updateFolder],
  );

  // 输入框回车事件
  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        handleEdit((e.target as HTMLInputElement).value);
      }
    },
    [handleEdit],
  );

  const handleBlur = useCallback(
    (e: FocusEvent) => {
      handleEdit((e.target as HTMLInputElement).value);
    },
    [handleEdit],
  );

  return (
    <div className={clsx('group', scss['menu-title'], { [scss['menu-title-article']]: !isFolder })}>
      <Icon
        type="icon-jiantou"
        className={scss['menu-title-arrow']}
      />
      <Icon type={isFolder ? 'icon-wenjianjia' : 'icon-24'} />
      <div className={scss['menu-title-content']}>
        {data.editor ? (
          <Input
            autoFocus
            size="sm"
            radius="none"
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            onClick={(e) => e.stopPropagation()}
            defaultValue={data.name}
            classNames={{
              input: '!text-white/80',
              inputWrapper: '!bg-white/10',
            }}
          />
        ) : (
          data.name
        )}
      </div>
      <More data={data} />
    </div>
  );
};

export default memo(Title);
