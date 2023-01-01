import Base from './Base';
import Bill from './Bill';
import Diet from './Diet';
import dayjs from 'dayjs';
import Fitness from './Fitness';
import ReactDOM from 'react-dom';
import scss from './index.module.scss';

import { actions } from '@store';
import { Modal, Tabs, Form } from 'antd';
import { DIARY_EDITOR_DIARY } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { useCreateDiariesMutation, useUpdateDiariesMutation } from '@store/graphql';

// tabs 配置
const TABS_SETTING = [
  { tab: '基础设置', key: 'base', Component: Base },
  { tab: '饮食记录', key: 'diet', Component: Diet },
  { tab: '训练记录', key: 'fitness', Component: Fitness },
  { tab: '账单记录', key: 'bill', Component: Bill },
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
    name: name.format('YYYY-MM-DD'),
    fitness: fitness.filter((v) => v),
  };
};

export default () => {
  const [createDiaries] = useCreateDiariesMutation();
  const [updateDiaries] = useUpdateDiariesMutation();
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
  ), [titleToolRef]);

  // 取消
  const onCancel = useCallback(() => {
    dispatch(actions.modal.close());
    form.resetFields();
  }, [dispatch, form]);

  // 确认
  const onOk = useCallback(async () => {
    const values = await form.validateFields();

    const id = modal?.diary?.id;
    const body = getBody(values);

    const res = id
      ? await updateDiaries({ body, conds: { id } })
      : await createDiaries({ body });
    const { change } = res.data[id ? 'updateDiaries' : 'createDiaries'];

    dispatch(actions.diary.updateDiaries(change));
    onCancel();
  }, [
    form,
    onCancel,
    dispatch,
    createDiaries,
    updateDiaries,
    modal?.diary?.id,
  ]);

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
        name: dayjs(modal?.diary?.name ?? modal.date),
        getUp: dayjs(modal?.diary?.getUp ?? modal.date),
        toRest: dayjs(modal?.diary?.toRest ?? modal.date),
      } : void 0,
    );
  }, [form, modal]);

  return (
    <Modal
      destroyOnClose
      width="80%"
      onOk={onOk}
      okText="确定"
      title={title}
      open={!!modal}
      cancelText="取消"
      closable={false}
      onCancel={onCancel}
      getContainer={false}
      className={scss.modal}>
      <Form form={form}>
        <Tabs
          tabPosition="left"
          onChange={onTabsChange}>
          {TABS_SETTING.map((V) => (
            <Tabs.TabPane
              forceRender
              tab={V.tab}
              key={V.key}
              className={scss.body}>
              <V.Component
                form={form}
                tools={Tools}
                showTools={activeTabKey === V.key}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
    </Modal>
  );
};
