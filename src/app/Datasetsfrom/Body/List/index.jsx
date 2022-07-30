import Item from './Item';
import scss from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CODE_DATASETSFROM_EDITOR, MENU_LIST } from '../../consts';

const useStateHook = () => {
  const dispatch = useDispatch();
  const datasetsfroms = useSelector((state) => {
    const {
      datasetsfrom,
      datasetsfrom: { menu: { selectedKey } },
    } = state;
    return selectedKey === MENU_LIST[0].key
      ? Object.values(datasetsfrom).reduce(
        (total, ele) => ([...total, ...ele]), [],
      )
      : (datasetsfrom[selectedKey] || []);
  });

  // 编辑
  const onEdit = (data) => {
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

  return { onEdit, onDelete, datasetsfroms };
};

export default () => {
  const state = useStateHook();

  return (
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
  );
};
