import { useMemo } from 'react';
import { MOVE } from '../../consts';
import { Modal, Cascader, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import scss from './index.module.scss';

const useStateHook = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { modal, tags } = useSelector((state) => ({
    tags: state.editor.tags,
    modal: state.modal[MOVE],
  }));

  // Cascader 组件 options 配置
  const options = useMemo(() => {
    const cloneTags = _.cloneDeep(Object.values(tags)).reduce((total, ele) => {
      // 移动目录时, 移除当前目录
      (modal?.data?.tags || ele.id !== modal?.data?.id) && total.push({
        ...ele,
        value: ele.id,
        label: ele.name,
      });
      return total;
    }, []);
    const groupTags = _.groupBy(cloneTags, 'parent.id');

    cloneTags.forEach(v => (v.children = groupTags[v.id])); // eslint-disable-line
    return _.sortBy(cloneTags.filter((v) => !v.parent?.id), 'name');
  }, [tags, modal]);

  // 点击取消
  const onCancel = () => dispatch({
    code: MOVE,
    type: 'modal/closeModal',
  });

  // 点击确定
  const onOk = async () => {
    const { paths } = await form.validateFields();
    dispatch({
      id: modal.data.id,
      type: modal.data.tags ? 'editor/updateArticle' : 'editor/updateTag',
      body: modal.data.tags ? { tags: paths } : { parent: _.last(paths) },
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
            getPopupContainer={(triggerNode) => triggerNode}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
