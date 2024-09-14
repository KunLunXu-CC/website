import scss from './index.module.scss';
import useResourceStore from '../../hooks/useResourceStore';
import useWorkspaceStore from '../../hooks/useWorkspaceStore';

import { Input } from 'antd';
import { memo, useCallback, ChangeEvent, useState, useMemo } from 'react';

const Search = () => {
  const { articles } = useResourceStore();
  const { appendArticleWorkspace } = useWorkspaceStore();

  const [keyword, setKeyword] = useState('');

  const results = useMemo(() => {
    if (!keyword) return [];
    const list = Object.values(articles);
    return list.filter((v) => v.name.includes(keyword) || v.content?.includes(keyword));
  }, [articles, keyword]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, []);

  const handleClick = useCallback(
    ({ id: articleId }: { id: string }) => {
      appendArticleWorkspace(articleId);
    },
    [appendArticleWorkspace],
  );

  return (
    <div className={scss.search}>
      <div className={scss['input-wrapper']}>
        <Input
          autoFocus
          value={keyword}
          placeholder="关键词"
          className={scss.input}
          onChange={handleChange}
        />
      </div>

      <div className={scss.body}>
        {results.map((v) => (
          <div
            key={v.id}
            className={scss.item}
            onClick={handleClick.bind(null, v)}>
            <div className={scss.title}>{v.name}</div>
            <div className={scss.content}>{v.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Search);
