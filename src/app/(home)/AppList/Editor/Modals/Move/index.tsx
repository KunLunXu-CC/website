import scss from './index.module.scss';
import { Modal, Cascader, Form } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import useMoveModalStore from '../../hooks/useMoveModalStore';
import useResourceStore from '../../hooks/useResourceStore';
import { last, sortBy, cloneDeep, groupBy, iteratee } from 'lodash';
import useUpdateArticle from '../../hooks/useUpdateArticle';
import useUpdateFolder from '../../hooks/useUpdateFolder';
import { IResourceFolderItem } from '../../types';

interface IOption extends IResourceFolderItem {
  id: string;
  value: string;
  label: string;
  children?: IOption[];
}

const Move = () => {
  const { updateArticle } = useUpdateArticle();
  const { updateFolder } = useUpdateFolder();
  const { onClose: closeMoveModal, data: modalData } = useMoveModalStore();
  const { folders } = useResourceStore();

  const [form] = Form.useForm();

  // 移动文章
  const isMoveArticle = useMemo(() => !!modalData?.folder, [modalData]);

  // Cascader 组件 options 配置
  const options = useMemo(() => {
    const cloneFolders = cloneDeep(Object.values(folders)).reduce<IOption[]>((total, ele) => {
      // 移动目录时, 移除当前目录

      if (modalData?.folder || ele.id !== modalData?.id) {
        total.push({
          ...ele,
          id: ele.id!,
          value: ele.id!,
          label: ele.name!,
        });
      }

      return total;
    }, []);

    const groupFolders = groupBy(cloneFolders, 'parent.id');

    cloneFolders.forEach((v) => (v.children = groupFolders[v.id]));

    return sortBy(
      cloneFolders.filter((v) => !v.parent?.id),
      'name',
    );
  }, [folders, modalData]);

  // 点击取消
  const handleCancel = useCallback(() => {
    closeMoveModal();
  }, [closeMoveModal]);

  // 点击确定
  const handleOk = useCallback(async () => {
    const { paths } = await form.validateFields();
    const folder = last(paths) as string;

    if (!modalData) return;

    // 编辑文章 folder, folder 不能为空
    if (isMoveArticle && folder) {
      updateArticle({
        id: modalData.id!,
        folder,
      });
    }

    // 编辑目录 parent, parent 允许为空
    if (!isMoveArticle) {
      updateFolder({
        id: modalData.id!,
        parent: folder || null,
      });
    }

    handleCancel();
  }, [form, isMoveArticle, handleCancel, updateArticle, modalData, updateFolder]);

  return (
    <Modal
      width={420}
      okText="确定"
      open={!!modalData}
      onOk={handleOk}
      closable={false}
      cancelText="取消"
      getContainer={false}
      maskClosable={false}
      className={scss.modal}
      onCancel={handleCancel}>
      <Form form={form}>
        <Form.Item
          name="paths"
          label="移动到"
          className={scss.item}
          rules={[
            {
              type: 'array',
              message: '移动路径必填!',
              required: isMoveArticle,
            },
          ]}>
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

export default memo(Move);
