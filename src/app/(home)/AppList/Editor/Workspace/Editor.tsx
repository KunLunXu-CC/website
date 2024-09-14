import { getOssUrl } from '@/utils';
import { IWorkspace } from '../types';
import { Image } from '@nextui-org/react';
import { Markdown } from '@kunlunxu/brick';
import { memo, useCallback, useEffect, useState } from 'react';
import useArticle from '../hooks/useArticle';
import useEditorUpload from '../hooks/useUpload';
import useUpdateArticle from '../hooks/useUpdateArticle';
import useWorkspaceStore from '../hooks/useWorkspaceStore';
import '@kunlunxu/brick/es/markdown/style';

// 渲染 md 插件 markdown-to-jsx 配置
const MD_TO_JSX_OPTIONS = {
  overrides: {
    img: ({ alt, src }: { alt: string; src: string }) => {
      const handledSrc = /^https?:/.test(src) ? src : getOssUrl(src);

      return (
        <Image
          alt={alt}
          radius="sm"
          src={handledSrc}
        />
      );
    },
  },
};

interface IEditorProps {
  workspace: IWorkspace;
}

const Editor = (props: IEditorProps) => {
  const { workspace } = props;
  const { updateArticle } = useUpdateArticle();
  const { article } = useArticle({ articleId: workspace.dataId });
  const [currentContent, setCurrentContent] = useState<string>(article?.content || '');

  const { upload } = useEditorUpload();
  const { updateWorkspace } = useWorkspaceStore();

  const handleChange = useCallback(({ value }: { value: string }) => setCurrentContent(value), []);

  // 保存(ctr + s): 修改文章内容
  const handleSave = useCallback(
    async ({ value: content }: { value: string }) => {
      if (!article) return;

      await updateArticle({
        content,
        id: article.id,
      });
    },
    [updateArticle, article],
  );

  // 插入图片
  const handleInsertImages = useCallback(
    async ({ files }: { files: File[] }) => {
      if (!article) return;

      const list = await upload({
        files,
        payload: article.id,
      });

      return list.map((v) => v.name);
    },
    [article, upload],
  );

  // 监听, 修改 change
  useEffect(() => {
    if (!article) return;

    const change = article.content !== currentContent;
    if (workspace.change !== change) {
      updateWorkspace({
        change,
        dataId: article.id,
      });
    }
  }, [article, currentContent, updateWorkspace, workspace.change]);

  return (
    <Markdown
      onSave={handleSave}
      value={currentContent}
      onChange={handleChange}
      mdToJsxOptions={MD_TO_JSX_OPTIONS}
      onInsertImages={handleInsertImages}
    />
  );
};

export default memo(Editor);
