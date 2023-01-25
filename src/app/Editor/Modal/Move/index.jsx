import scss from './index.module.scss';

import { actions } from '@store';
import { MOVE } from '../../consts';
import { Modal, Cascader, Form } from 'antd';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { modal, folders } = useSelector((state) => ({
    folders: state.editor.folders,
    modal: state.modal[MOVE],
  }));

  // Cascader 组件 options 配置
  const options = useMemo(() => {
    const cloneFolders = _.cloneDeep(Object.values(folders))
      .reduce((total, ele) => {
        // 移动目录时, 移除当前目录
        (modal?.data?.folder || ele.id !== modal?.data?.id) && total.push({
          ...ele,
          value: ele.id,
          label: ele.name,
        });

        return total;
      }, []);
    const groupFolders = _.groupBy(cloneFolders, 'parent.id');

    cloneFolders.forEach(v => (v.children = groupFolders[v.id])); // eslint-disable-line
    return _.sortBy(cloneFolders.filter((v) => !v.parent?.id), 'name');
  }, [folders, modal]);

  // 点击取消
  const onCancel = useCallback(() => {
    dispatch(actions.modal.close());
  }, [dispatch]);

  // 点击确定
  const onOk = useCallback(async () => {
    const { paths } = await form.validateFields();
    dispatch({
      id: modal.data.id,
      type: modal.data.folder ? 'editor/updateArticle' : 'editor/updateTag',
      body: modal.data.folder
        ? { folder: _.last(paths) }
        : { parent: _.last(paths) },
    });
    onCancel();
  }, [dispatch, form, onCancel, modal?.data]);

  return (
    <Modal
      okText="确定"
      cancelText="取消"
      closable={false}
      onOk={onOk}
      open={!!modal}
      getContainer={false}
      maskClosable={false}
      className={scss.modal}
      onCancel={onCancel}>
      <Form form={form}>
        <Form.Item
          name="paths"
          label="移动到"
          className={scss.item}
          rules={[{
            type: 'array',
            required: true,
            message: '移动路径必填!',
          }]}>
          <Cascader
            changeOnSelect
            options={options}
            placeholder="选择要移动位置"
            getPopupContainer={(triggerNode) => triggerNode}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
