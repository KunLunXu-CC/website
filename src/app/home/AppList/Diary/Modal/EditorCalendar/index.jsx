import Base from './Base';
import Bill from './Bill';
import Diet from './Diet';
import dayjs from 'dayjs';
import Fitness from './Fitness';
import scss from './index.module.scss';

import { actions } from '@/store';
import classNames from 'classnames';
import { Icon } from '@kunlunxu/brick';
import { Modal, Tabs, Form } from 'antd';
import { DIARY_EDITOR_DIARY } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useCreateDiariesMutation, useUpdateDiariesMutation } from '@/store/graphql';

// tabs 配置
const TABS_SETTING = [
  { label: '基础设置', key: 'base', Component: Base },
  { label: '饮食记录', key: 'diet', Component: Diet },
  { label: '训练记录', key: 'fitness', Component: Fitness },
  { label: '账单记录', key: 'bill', Component: Bill },
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

const EditorCalendar =  () => {
  const dispatch = useDispatch();
  const [createDiaries] = useCreateDiariesMutation();
  const [updateDiaries] = useUpdateDiariesMutation();

  const addRef = useRef();
  const [activeTabKey, setActiveTabKey] = useState(TABS_SETTING[0].key);

  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);

  // 弹窗
  const modal = useSelector((state) => state.modal[DIARY_EDITOR_DIARY]);

  const initialValues = useMemo(() => (modal ? {
    bill: modal.diary?.bill ?? [],
    diet: modal.diary?.diet ?? [],
    fitness: modal.diary?.fitness ?? [],
    bodyIndex: modal.diary?.bodyIndex ?? {},
    name: dayjs(modal.diary?.name ?? modal.date),
    getUp: dayjs(modal.diary?.getUp ?? modal.date),
    toRest: dayjs(modal.diary?.toRest ?? modal.date),
  } : {}), [modal]);

  // 弹窗标题
  const title = useMemo(() => (
    <>
      {name?.format('YYYY-MM-DD')}
      <Icon
        type="icon-xinzeng"
        className={scss['title-tool']}
        onClick={() => addRef.current?.()}
      />
    </>
  ), [name]);

  const items = useMemo(() => TABS_SETTING.map((V) => (
    {
      ...V,
      forceRender: true,
      className: scss.body,
      children: (
        <V.Component
          form={form}
          addRef={addRef}
          isShow={V.key === activeTabKey}
        />
      ),
    }
  )), [activeTabKey, form]);

  const handleCancel = useCallback(() => {
    dispatch(actions.modal.close());
  }, [dispatch]);

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
    handleCancel();
  }, [
    form,
    handleCancel,
    dispatch,
    createDiaries,
    updateDiaries,
    modal?.diary?.id,
  ]);

  // tabs 切换
  const onTabsChange = (activeTabKey) => {
    setActiveTabKey(activeTabKey);
  };

  // modal 变化时, 需要重新 resetFields
  useEffect(() => {
    form.resetFields();
  }, [form, modal]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      className={classNames(scss.form, scss[activeTabKey])}>
      <Modal
        destroyOnClose
        width="80%"
        onOk={onOk}
        okText="确定"
        title={title}
        open={!!modal}
        cancelText="取消"
        closable={false}
        maskClosable={false}
        getContainer={false}
        className={scss.modal}
        onCancel={handleCancel}>
        <Tabs
          items={items}
          tabPosition="left"
          onChange={onTabsChange}
        />
      </Modal>
    </Form>
  );
};

export default EditorCalendar;
