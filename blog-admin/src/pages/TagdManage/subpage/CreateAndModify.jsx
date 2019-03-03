import { useOptionsHook } from '@hook';
import { OPERATING_TYPE } from '@config/conts';
import React, { useMemo, useEffect } from 'react';
import { getOptiionsOfconts } from '@utils/helper';
import { createTags, updateTagByIds } from '@server';
import { Modal, Form, Input, Row, Col, Select } from 'antd';

// 操作类型映射处理函数
const mapHandleFunWithOperating = {
  [OPERATING_TYPE.EDIT.VALUE]: updateTagByIds,
  [OPERATING_TYPE.CREATE.VALUE]: createTags
};

// 下拉项
const colorOptions = getOptiionsOfconts('TAG_COLORS');
const iconOptions = getOptiionsOfconts('TAG_ICONS');

// label 组件
const Label = ({children, required}) => (
  <span style={{ paddingLeft: required ? ' 0px' : '10px' }}>{children}</span>
);

const FormBlock = ({ modalStore, listStore, form }) => {
  const tagOptsStore = useOptionsHook({model: "Tag"});

  useEffect(() => {
    modalStore.onOpen((data) => {
      if(data.current && data.current.parent){
        tagOptsStore.resetParams({ids: [data.current.parent.id]});
      } else {
        tagOptsStore.init();
      }
    });
    modalStore.onClose(() => {
      form.resetFields();
    });
  }, []);

  // 查询 
  const onSearchTagOpts = (value) => {
    tagOptsStore.resetParams({name: value});
  };

  // 弹窗确定事件
  const onOk = () => {
    form.validateFieldsAndScroll((error, values) => {
      if(!error){
        const handleFun = mapHandleFunWithOperating[modalStore.data.type];
        const id = (modalStore.data.current || {}).id;
        handleFun && handleFun({id, body: values}).then(res => {
          listStore.resetPage({ page: 1 });
        });
        modalStore.closeModal();
      }
    });
  };

  // 表单初始值
  const initialValues = useMemo(() => {
    return modalStore.data.current || {};
  }, [modalStore.data.current]);

  return (
    <Modal
      onOk={onOk}
      width={800}
      onCancel={modalStore.closeModal}
      visible={modalStore.isOpen}
      title={modalStore.data.title}
    >
      <Form className="ant-advanced-search-form">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label={<Label required>名称</Label>}>
              {
                form.getFieldDecorator("name", {
                  initialValue: initialValues.name, 
                  rules: [{ required: true, message: '标签名称必填' }],
                })( <Input placeholder="标签名称"/> )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<Label>父级</Label>}>
              {
                form.getFieldDecorator("parent", {
                  initialValue: (initialValues.parent || {}).id,
                })( 
                  <Select 
                    allowClear 
                    showSearch 
                    placeholder="所属标签"
                    filterOption = {false} 
                    onSearch={onSearchTagOpts}
                  >
                    { tagOptsStore.options }
                  </Select> 
                )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<Label>颜色</Label>}>
              {
                form.getFieldDecorator("color", {
                  initialValue: initialValues.color,
                })( <Select allowClear placeholder="标签颜色">{ colorOptions }</Select>)
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<Label>图标</Label>}>
              {
                form.getFieldDecorator("icon", {
                  initialValue: initialValues.icon,
                })( <Select allowClear placeholder="标签图标">{ iconOptions }</Select> )
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default Form.create({})(FormBlock);
