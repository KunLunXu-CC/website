import scss from './index.module.scss';

import { Input } from 'antd';
import { actions } from '@store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();

  const { keyword, results } = useSelector((state) => state.editor.search);

  const handleChange = useCallback((event) => {
    dispatch(actions.editor.setSearchKeyword(event.target.value));
  }, [dispatch]);

  return (
    <div className={scss.search}>

      <div className={scss['input-wrapper']}>
        <Input
          value={keyword}
          className={scss.input}
          onChange={handleChange}
        />
      </div>

      <div className={scss.body}>
        {results.map((v)  => (
          <div
            key={v.id}
            className={scss.item}>
            <div className={scss.title}>
              {v.name}
            </div>
            <div className={scss.content}>
              {v.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
