import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import BaseForm from './BaseForm';
import BillForm from './BillForm';
import DietForm from './DietForm';
import FitnessForm from './FitnessForm';
import scss from './index.module.scss';

import { Modal, Tabs, Form } from 'antd';
import { DIARY_EDITOR_DIARY } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';

// tabs 配置
const TABS_SETTING = [
  { tab: '基础设置', key: 'base', Component: BaseForm },
  { tab: '饮食记录', key: 'diet', Component: DietForm },
  { tab: '训练记录', key: 'fitness', Component: FitnessForm },
  { tab: '账单记录', key: 'bill', Component: BillForm },
];

// 获取 body
const getBody = (values) => {
  const {
    name,
    getUp,
    toRest,
    bodyIndex,
    bill = [],
    diet = [],
    fitness = [],
  } = values;
  return {
    getUp,
    toRest,
    bodyIndex,
    bill: bill.filter((v) => v),
    diet: diet.filter((v) => v),
    fitness: fitness.filter((v) => v),
    name: name.format('YYYY-MM-DD'),
  };
};

const useStateHook = () => {
  const [activeTabKey, setActiveTabKey] = useState(TABS_SETTING[0].key);
  const titleToolRef = useRef();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 弹窗
  const modal = useSelector((state) => state.modal[DIARY_EDITOR_DIARY]);

  // 工具: 传送门
  const Tools = useCallback(({ children }) => (
    titleToolRef.current
      ? ReactDOM.createPortal(children, titleToolRef.current)
      : null
  ), [titleToolRef]);

  // 弹窗标题
  const title = useMemo(() => (
    <div className={scss.title}>
      <div className={scss['title-text']}>
        添加数据
      </div>
      <div
        className={scss['title-tool']}
        ref={titleToolRef}
      />
    </div>
  ), [modal, titleToolRef]);

  // 取消
  const onCancel = () => {
    dispatch({
      code: DIARY_EDITOR_DIARY,
      type: 'modal/closeModal',
    });
    form.resetFields();
  };

  // 确认
  const onOk = async () => {
    const values = await form.validateFields();
    const id = modal?.diary?.id;
    const body = getBody(values);
    dispatch({
      id,
      body,
      type: id ? 'diary/updateDiaries' : 'diary/createDiarie',
    });
    onCancel();
  };

  // tabs 切换
  const onTabsChange = (activeTabKey) => {
    setActiveTabKey(activeTabKey);
  };

  // 重新设置值
  useEffect(() => {
    form.setFieldsValue(
      modal ? {
        diet: (modal?.diary?.diet ?? []).map(
          (v) => ({ ...v, type: v.type?.value }),
        ),
        fitness: (modal?.diary?.fitness ?? []).map(
          (v) => ({ type: v.type?.value, place: v.place?.value }),
        ),
        bill: (modal?.diary?.bill ?? []).map(
          (v) => ({ ...v, tag: v.tag?.value }),
        ),
        bodyIndex: modal?.diary?.bodyIndex ?? {},
        name: moment(modal?.diary?.name ?? modal.date),
        getUp: moment(modal?.diary?.getUp ?? modal.date),
        toRest: moment(modal?.diary?.toRest ?? modal.date),
      } : void 0,
    );
  }, [modal]);

  return {
    onOk,
    form,
    title,
    Tools,
    modal,
    onCancel,
    onTabsChange,
    activeTabKey,
  };
};

export default () => {
  const state = useStateHook();
  return (
    <Form form={state.form}>
      <Modal
        width="80%"
        okText="确定"
        destroyOnClose
        closable={false}
        cancelText="取消"
        onOk={state.onOk}
        title={state.title}
        getContainer={false}
        className={scss.modal}
        visible={!!state.modal}
        onCancel={state.onCancel}>
        <Tabs
          tabPosition="left"
          onChange={state.onTabsChange}>
          {TABS_SETTING.map((V) => (
            <Tabs.TabPane
              tab={V.tab}
              key={V.key}
              forceRender
              className={scss.body}>
              <V.Component
                form={state.form}
                tools={state.Tools}
                showTools={state.activeTabKey === V.key}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Modal>
    </Form>
  );
};
