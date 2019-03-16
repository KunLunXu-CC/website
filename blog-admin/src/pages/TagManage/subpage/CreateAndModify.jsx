import { useOptionsHook } from '@hook';
import { OPERATING_TYPE } from '@config/conts';
import React, { useMemo, useEffect } from 'react';
import { FormItem } from '@components';
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

const FormBlock = ({ modalStore, listStore, form }) => {
  const tagOptsStore = useOptionsHook({model: "Tag"});

  useEffect(() => {
    modalStore.onOpen((data) => {
      if(data.current && data.current.parent && data.current.parent.id){
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
            <FormItem label="名称" length="3" required>
              {
                form.getFieldDecorator("name", {
                  initialValue: initialValues.name, 
                  rules: [{ required: true, message: '标签名称必填' }],
                })( <Input placeholder="标签名称"/> )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="父级" length="3">
              {
                form.getFieldDecorator("parent", {
                  initialValue: (initialValues.parent || {}).id || undefined,
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
           </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="颜色" length="3">
              {
                form.getFieldDecorator("color", {
                  initialValue: initialValues.color,
                })( <Select allowClear placeholder="标签颜色">{ colorOptions }</Select>)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="图标" length="3">
              {
                form.getFieldDecorator("icon", {
                  initialValue: initialValues.icon,
                })( <Select allowClear placeholder="标签图标">{ iconOptions }</Select> )
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default Form.create({})(FormBlock);
