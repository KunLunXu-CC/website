import React, {
  useCallback,
} from 'react';

import { Markdown } from '@kunlunxu/brick';
import { uploadPhotos } from '../../model/services';
import { useDispatch, useSelector } from 'react-redux';
import { APP_CODE, PHOTO_TYPE } from '@config/consts';

// 初始默认 options
const OPTIONS = {
  tabSize: 2,                 // tab 大小
  fontSize: 14,               // 字体大小
  wordWrap: 'on',             // 自动换行
  language: 'markdown',       // 语言设置
  theme: 'one-dark-pro',      // 主题设置
  fontFamily: 'monospace, \'Droid Sans Mono\', \'Droid Sans Fallback\'',
};

const useStateHook = (props) => {
  const dispatch = useDispatch();

  // 读取文章详细内容
  const article = useSelector((state) => (
    state.editor?.articles?.[props.work.article]
  ));

  // 保存(ctr + s): 修改文章内容
  const onSave = async ({ value: content }) => {
    dispatch({
      content,
      id: article.id,
      type: 'editor/updateArticleContent',
    });
  };

  // 黏贴图片
  const onPasteImage = async ({ file }) => {
    const data = await uploadPhotos({
      files: [file],
      payload: article.id,
      spin: APP_CODE.EDITOR,
      type: PHOTO_TYPE.ARTICLE.VALUE,
    });
    return `![图片备注](${data?.[0]?.fileName})`;
  };

  // 内容改变
  const onChange = useCallback(({ value: content }) => {
    const change = article.content !== content;

    if (props.work.change === change) {
      return false;
    }

    dispatch({
      work: { change },
      type: 'editor/setWork',
      article: props.work.article,
    });
  }, [article.content, props.work.article, props.work.change]);

  return { article, onSave, onPasteImage, onChange };
};

export default (props) => {
  const state = useStateHook(props);

  return (
    <Markdown
      options={OPTIONS}
      onSave={state.onSave}
      onChange={state.onChange}
      value={state.article.content}
      onPasteImage={state.onPasteImage}
    />
  );
};
