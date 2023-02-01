import scss from './index.module.scss';

import { actions } from '@store';
import { MOVE } from '../../consts';
import { Modal, Cascader, Form } from 'antd';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleUpdateArticles, useHandleUpdateFolders } from '@app/Editor/hooks';

export default () => {
  const handleUpdateFolders = useHandleUpdateFolders();
  const handleUpdateArticles = useHandleUpdateArticles();

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
  const handleCancel = useCallback(() => {
    dispatch(actions.modal.close());
  }, [dispatch]);

  // 点击确定
  const handleOk = useCallback(async () => {
    const { paths } = await form.validateFields();
    const editorArticles = !!modal.data.folder;
    const last = _.last(paths);

    // 编辑文章 folder, folder 不能为空
    if (editorArticles && last) {
      handleUpdateArticles({
        conds: { id: modal.data.id },
        body: { folder: last },
      });
    }

    // 编辑目录 parent, parent 允许为空
    if (!editorArticles) {
      handleUpdateFolders({
        conds: { id: modal.data.id },
        body: { parent: last },
      });
    }

    handleCancel();
  }, [
    form,
    modal?.data,
    handleCancel,
    handleUpdateFolders,
    handleUpdateArticles,
  ]);

  return (
    <Modal
      okText="确定"
      cancelText="取消"
      closable={false}
      handleOk={handleOk}
      open={!!modal}
      getContainer={false}
      maskClosable={false}
      className={scss.modal}
      handleCancel={handleCancel}>
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
