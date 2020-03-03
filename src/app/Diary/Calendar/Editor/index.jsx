import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
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

const useStateHook = () => {
  const [activeTabKey, setActiveTabKey] = useState(TABS_SETTING[0].key);
  const titleToolRef = useRef();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 弹窗
  const model = useSelector(
    state => _.get(state, `modal[${DIARY_EDITOR_DIARY}]`)
  );

  // 工具: 传送门
  const Tools = useCallback(({ children }) => (
    titleToolRef.current
      ? ReactDOM.createPortal(children, titleToolRef.current)
      : null
  ), [titleToolRef]);

  // 弹窗标题
  const title = useMemo(() => (
    <div className={scss.title}>
      <div className={scss['title-text']}>添加数据</div>
      <div className={scss['title-tool']} ref={titleToolRef}>
      </div>
    </div>
  ), [model, titleToolRef]);

  // 取消
  const onCancel = () => {
    dispatch({
      code: DIARY_EDITOR_DIARY,
      type: 'modal/closeModal',
    });
  };

  // 确认
  const onOk = async () => {
    onCancel();
  };

  // tabs 切换
  const onTabsChange = activeTabKey => {
    setActiveTabKey(activeTabKey);
  };

  return {
    onOk,
    form,
    title,
    Tools,
    model,
    onCancel,
    onTabsChange,
    activeTabKey,
  };
};

export default () => {
  const state = useStateHook();
  return (
    <Form form={state.form}>
      {console.log('state.activeTabKey', state.activeTabKey)}
      <Modal
        width="80%"
        okText="确定"
        closable={false}
        cancelText="取消"
        onOk={state.onOk}
        title={state.title}
        getContainer={false}
        className={scss.modal}
        visible={!!state.model}
        onCancel={state.onCancel}>
        <Tabs tabPosition="left" onChange={state.onTabsChange}>
          {TABS_SETTING.map(V => (
            <Tabs.TabPane
              forceRender
              tab={V.tab}
              key={V.key}>
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
