import React, { useMemo, useCallback } from 'react';
import { OPERATING_TYPE } from '@config/conts';
import { Modal, Form, Input, Row, Col } from 'antd';
import { createTags, updateTagByIds } from '@server/index';

// 操作类型映射处理函数
const mapOperatingWithFun = {
  [OPERATING_TYPE.EDIT]: updateTagByIds,
  [OPERATING_TYPE.CREATE]: createTags
};

const FormBlock = ({ modalStore, listStore, form }) => {
  const { getFieldDecorator } = form;

  // 弹窗确定事件
  const onOk = useCallback(() => {
    form.validateFieldsAndScroll((error, values) => {
      if(!error){
        const handleFun = mapOperatingWithFun[modalStore.data.type];
        const id = (modalStore.data.current || {}).id;
        handleFun && handleFun({id, body: values}).then(res => {
          listStore.resetPage({ page: 1 });
        });
        closeModal();
      }
    });
  });

  // 关闭弹窗事件
  const closeModal = useCallback(() => {
    modalStore.closeModal();
    form.resetFields();
  });

  // 表单初始值
  const initialValues = useMemo(() => {
    return modalStore.data.current || {};
  }, [modalStore.data.current]);

  return (
    <Modal
      onOk={onOk}
      width={800}
      onCancel={closeModal}
      visible={modalStore.isOpen}
      title={modalStore.data.title}
    >
      <Form className="ant-advanced-search-form">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="名称">
              {
                getFieldDecorator("name", {
                  initialValue: initialValues.name, 
                  rules: [{ required: true, message: '标签名称必填' }],
                })( <Input placeholder="标签名称"/> )
              }
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="颜色">
              {
                getFieldDecorator("color", {
                  initialValue: initialValues.color,
                })( <Input placeholder="标签颜色"/> )
              }
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="图标">
              {
                getFieldDecorator("icon", {
                  initialValue: initialValues.icon,
                })( <Input placeholder="标签图标"/> )
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default Form.create({})(FormBlock);
