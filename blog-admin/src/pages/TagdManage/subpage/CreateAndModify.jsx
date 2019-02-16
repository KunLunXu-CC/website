import { OPERATING_TYPE } from '@config/conts';
import React, { useMemo, useCallback } from 'react';
import { getOptiionsOfconts } from '@utils/helper';
import { createTags, updateTagByIds } from '@server';
import { Modal, Form, Input, Row, Col, Select } from 'antd';

// 操作类型映射处理函数
const mapOperatingWithFun = {
  [OPERATING_TYPE.EDIT.value]: updateTagByIds,
  [OPERATING_TYPE.CREATE.value]: createTags
};

// 下拉项
const colorOptions = getOptiionsOfconts('TAG_COLORS');
const iconOptions = getOptiionsOfconts('TAG_ICONS');

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
                })( <Select placeholder="标签颜色">{ colorOptions }</Select>)
              }
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="图标">
              {
                getFieldDecorator("icon", {
                  initialValue: initialValues.icon,
                })( <Select placeholder="标签图标">{ iconOptions }</Select> )
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default Form.create({})(FormBlock);
