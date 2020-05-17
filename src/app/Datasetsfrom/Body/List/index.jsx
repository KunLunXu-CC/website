import React from 'react';
import Item from './Item';
import scss from './index.module.scss';

import { Scroll } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CODE_DATASETSFROM_EDITOR } from '../../consts';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { datasetsfroms } = useSelector(
    state => (state.datasetsfrom)
  );

  React.useEffect(() => {
    dispatch({
      type: 'datasetsfrom/getDatasetsfroms',
    });
  }, []);

  // 编辑
  const onEdit = data => {
    dispatch({
      data,
      title: '编辑字典',
      type: 'modal/openModal',
      code: MODAL_CODE_DATASETSFROM_EDITOR,
    });
  };

  // 编辑
  const onDelete = ({ id }) => {
    dispatch({
      id,
      type: 'datasetsfrom/removeDatasetsfrom',
    });
  };

  return { datasetsfroms, onEdit, onDelete };
};

export default () => {
  const state = useStateHook();

  return (
    <Scroll className={scss.list}>
      <div className={scss.body}>
        {state.datasetsfroms.map((v, key) => (
          <Item
            data={v}
            key={key}
            onEdit={state.onEdit.bind(null, v)}
            onDelete={state.onDelete.bind(null, v)}
          />
        ))}
      </div>
    </Scroll>
  );
};
