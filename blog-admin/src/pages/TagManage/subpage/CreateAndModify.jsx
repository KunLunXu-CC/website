import { FormItem } from '@components';
import { useOptionsHook } from '@hook';
import { OPERATING_TYPE } from '@config/conts';
import React, { useMemo, useEffect } from 'react';
import { createTags, updateTagByIds } from '@server';
import { Modal, Form, Input, Row, Col, Select } from 'antd';

// 操作类型映射处理函数
const mapHandleFunWithOperating = {
  [OPERATING_TYPE.EDIT.VALUE]: updateTagByIds,
  [OPERATING_TYPE.CREATE.VALUE]: createTags
};

const useStateHook = ({ modalHook, listHook, form }) => {
  // 下拉项
  const colorOptions = useOptionsHook({conts: 'TAG_COLORS'}).options;
  const iconOptions = useOptionsHook({conts: 'TAG_ICONS'}).options;
  const tagOptionsHook = useOptionsHook({model: "Tag"});

  useEffect(() => {
    modalHook.onOpen((data) => {
      if (data.current && data.current.parent && data.current.parent.id){
        tagOptionsHook.resetParams({
          conds: { 
            ids: [data.current.parent.id],
            filter: [data.current.id]
          }
        });
      } else {
        tagOptionsHook.init();
      }
    });
    modalHook.onClose(() => {
      form.resetFields();
    });
  }, []);

  // 查询 
  const onSearchTagOpts = (value) => {
    tagOptionsHook.resetParams({
      conds: {name: value}
    });
  };

  // 弹窗确定事件
  const onOk = () => {
    form.validateFieldsAndScroll((error, values) => {
      if (!error){
        const handleFun = mapHandleFunWithOperating[modalHook.data.type];
        const id = (modalHook.data.current || {}).id;
        handleFun && handleFun({id, body: values}).then(res => {
          listHook.setPage({ page: 1 });
        });
        modalHook.closeModal();
      }
    });
  };

  // 表单初始值
  const initialValues = useMemo(() => {
    return modalHook.data.current || {};
  }, [modalHook.data.current]);

  return {
    onOk, 
    iconOptions, 
    colorOptions, 
    tagOptionsHook, 
    initialValues,
    onSearchTagOpts, 
  };
}

const FormBlock = (props) => {
  const { 
    onOk, 
    iconOptions, 
    colorOptions, 
    tagOptionsHook, 
    initialValues,
    onSearchTagOpts, 
  } = useStateHook(props);

  return (
    <Modal
      onOk={onOk}
      width={800}
      onCancel={props.modalHook.closeModal}
      visible={props.modalHook.isOpen}
      title={props.modalHook.data.title}
    >
      <Form className="ant-advanced-search-form">
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label="名称" length="3" required>
              {
                props.form.getFieldDecorator("name", {
                  initialValue: initialValues.name, 
                  rules: [{ required: true, message: '标签名称必填' }],
                })( <Input placeholder="标签名称"/> )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="父级" length="3">
              {
                props.form.getFieldDecorator("parent", {
                  initialValue: (initialValues.parent || {}).id || undefined,
                })( 
                  <Select 
                    allowClear 
                    showSearch 
                    placeholder="所属标签"
                    filterOption = {false} 
                    onSearch={onSearchTagOpts}
                  >
                    { tagOptionsHook.options }
                  </Select> 
                )
              }
           </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="颜色" length="3">
              {
                props.form.getFieldDecorator("color", {
                  initialValue: initialValues.color,
                })( <Select allowClear placeholder="标签颜色">{ colorOptions }</Select>)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="图标" length="3">
              {
                props.form.getFieldDecorator("icon", {
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
