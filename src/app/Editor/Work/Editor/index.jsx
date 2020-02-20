import React, {
  useCallback,
} from 'react';

import { CodeEditor } from 'qyrc';
import { uploadPhotos } from '../../model/services';
import { useDispatch, useSelector } from 'react-redux';
import { SPIN_CODE, PHOTO_TYPE } from '@config/consts';

// 初始默认 options
const OPTIONS = {
  language: 'markdown',
  theme: 'one-dark-pro',
  fontFamily: 'monospace, \'Droid Sans Mono\', \'Droid Sans Fallback\'',
};

const useStateHook = props => {
  const dispatch = useDispatch();

  // 读取文章详细内容
  const article = useSelector(state => {
    const articles = _.get(state, 'editor.articles');
    return articles.find(v => v.id === props.work.article);
  });

  // 保存: ctr + s
  const onSave = async ({ value: content }) => {
    dispatch({
      id: article.id,
      body: { content },
      type: 'editor/updateArticle',
    });
  };

  // 黏贴图片
  const onPasteImage = async ({ file }) => {
    const data = await uploadPhotos({
      files: [file],
      payload: article.id,
      spin: SPIN_CODE.APP_EDITOR,
      type: PHOTO_TYPE.ARTICLE.VALUE,
    });
    return `[图片备注](${_.get(data, '[0].url', '')})`;
  };

  // 内容改变
  const onChange = useCallback(({ value: content }) => {
    console.log('-------------->>>', props.work);

    const change = article.content !== content;
    if (props.work.change === change) {
      return false;
    }
    dispatch({
      work: { change },
      type: 'editor/setWork',
      article: props.work.article,
    });
  }, [props.work.article, props.work.change]);

  return { article, onSave, onPasteImage, onChange };
};

export default props => {
  const state = useStateHook(props);

  return (
    <CodeEditor
      options={OPTIONS}
      onSave={state.onSave}
      onChange={state.onChange}
      onPasteImage={state.onPasteImage}
      value={state.article.content}
    />
  );
};
