import React from 'react';
import scss from './index.module.scss';

import { DATASETSFROM_CODE } from '@config/consts';
import { useSelector, useDispatch } from 'react-redux';
import { MODAL_CODE_DATASETSFROM_EDITOR } from '../../consts';
import { Form, Modal, Input, InputNumber, Select } from 'antd';

// 类型下拉选项
const CODE_OPTIONS = Object.values(DATASETSFROM_CODE).map(v => (
  <Select.Option key={v.VALUE} value={v.VALUE}>
    {v.DESC}
  </Select.Option>
));

const useStateHook = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { modal, menuSelectedKey } = useSelector(state => ({
    modal: state.modal[MODAL_CODE_DATASETSFROM_EDITOR],
    menuSelectedKey: state.datasetsfromManage.menu.selectedKey,
  }));

  // 取消: 关闭弹窗
  const onCancel = () => {
    dispatch({
      type: 'modal/closeModal',
      code: MODAL_CODE_DATASETSFROM_EDITOR,
    });
  };

  // 确认
  const onOk = async () => {
    const body = await form.validateFields();
    dispatch({
      body,
      id: modal.data ?. id,
      code: MODAL_CODE_DATASETSFROM_EDITOR,
      type: modal.data
        ? 'datasetsfromManage/updateDatasetsfrom'
        : 'datasetsfromManage/createDatasetsfrom',
    });
    onCancel();
  };

  React.useEffect(() => {
    modal
      ? form.setFieldsValue({
        name: modal.data ?. name ?? void 0,
        value: modal.data ?. value ?? void 0,
        desc: modal.data ?. desc ?? void 0,
        icon: modal.data ?. icon ?? void 0,
        code: modal.data
          ?. code
          ?? (_.isNumber(menuSelectedKey) ? menuSelectedKey : void 0),
      })
      : form.resetFields();
  }, [modal]);

  return { form, modal, onOk, onCancel };
};

export default () => {
  const state = useStateHook();

  return (
    <Form form={state.form} labelCol={{ span: 3 }}>
      <Modal
        width={600}
        okText="确定"
        destroyOnClose
        closable={false}
        cancelText="取消"
        onOk={state.onOk}
        getContainer={false}
        className={scss.modal}
        visible={!!state.modal}
        onCancel={state.onCancel}
        title={state.modal ?. title}>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请填写字典名称!' }]}>
          <Input placeholder="字典名称"/>
        </Form.Item>
        <Form.Item
          label="数值"
          name="value"
          rules={[{ required: true, message: '请填写字典值!' }]}>
          <InputNumber placeholder="字典值" style={{ width: '100%' }}/>
        </Form.Item>
        <Form.Item
          name="code"
          label="类型"
          rules={[{ required: true, message: '请选择字典类型!' }]}>
          <Select placeholder="字典类型">{CODE_OPTIONS}</Select>
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Input placeholder="图标"/>
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input.TextArea rows={4} placeholder="字典描述"/>
        </Form.Item>
      </Modal>
    </Form>
  );
};