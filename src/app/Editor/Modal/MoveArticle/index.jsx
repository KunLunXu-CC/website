import React from 'react';
import scss from './index.module.scss';

import { MOVE_ARTICLE } from '../../consts';
import { Modal, Cascader, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { modal, tags } = useSelector(state => ({
    tags: state.editor.tags,
    modal: state.modal[MOVE_ARTICLE],
  }));

  // Cascader 组件 options 配置
  const options = React.useMemo(() => {
    const cloneTags = _.cloneDeep(Object.values(tags)).map(v => ({
      ... v,
      value: v.id,
      label: v.name,
    }));
    const groupTags = _.groupBy(cloneTags, 'parent.id');
    cloneTags.forEach(v => (v.children = groupTags[v.id])); // eslint-disable-line
    return cloneTags.filter(v => !v.parent?.id);
  }, [tags]);

  // 点击取消
  const onCancel = () => dispatch({
    code: MOVE_ARTICLE,
    type: 'modal/closeModal',
  });

  // 点击确定
  const onOk = async () => {
    const { data: { id } } = modal;
    const { paths: tags } = await form.validateFields();
    dispatch({
      id,
      type: 'editor/updateArticle',
      body: { tags },
    });
    onCancel();
  };

  return { onCancel, onOk, modal, options, form };
};

export default () => {
  const state = useStateHook();
  return (
    <Modal
      okText="确定"
      cancelText="取消"
      closable={false}
      onOk={state.onOk}
      getContainer={false}
      maskClosable={false}
      className={scss.modal}
      visible={!!state.modal}
      onCancel={state.onCancel}>
      <Form form={state.form}>
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
            options={state.options}
            placeholder="选择要移动位置"
            getPopupContainer={triggerNode => triggerNode}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
