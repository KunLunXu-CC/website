import Base from "./Base";
import Bill from "./Bill";
import Diet from "./Diet";
import dayjs from "dayjs";
import Fitness from "./Fitness";
import classNames from "classnames";
import scss from "./index.module.scss";
import useCalendarSave from "../../hooks/useCalendarSave";
import useCalendarStore from "../../hooks/useCalendarStore";

import { Icon } from "@kunlunxu/brick";
import { Modal, Tabs, Form } from "antd";
import { StoreValue } from "antd/es/form/interface";
import { memo, useRef, useMemo, useState, useEffect, useCallback } from "react";

interface IFormData {
  name: dayjs.Dayjs;
  getUp: dayjs.Dayjs;
  toRest: dayjs.Dayjs;
  bodyIndex: {
    weight: number;
    bodyfat: number;
    moistureContent: number;
  };
  bill: unknown[];
  diet: unknown[];
  fitness: unknown[];
}

// tabs 配置
const TABS_SETTING = [
  { label: "基础设置", key: "base", Component: Base },
  { label: "饮食记录", key: "diet", Component: Diet },
  { label: "训练记录", key: "fitness", Component: Fitness },
  { label: "账单记录", key: "bill", Component: Bill },
];

// 获取 body
const getBody = (values: IFormData) => {
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
    bill: bill.filter(Boolean),
    diet: diet.filter(Boolean),
    name: name.format("YYYY-MM-DD"),
    fitness: fitness.filter(Boolean),
  };
};

const EditorCalendar = () => {
  const addRef = useRef<
    (defaultValue?: StoreValue, insertIndex?: number) => void
  >(() => {});

  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const [activeTabKey, setActiveTabKey] = useState<string>(TABS_SETTING[0].key);

  const { onSave } = useCalendarSave();
  const { editDiary, setEditDiary } = useCalendarStore();

  const items = useMemo(
    () =>
      TABS_SETTING.map((V) => ({
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
      })),
    [activeTabKey, form],
  );

  const initialValues = useMemo(() => {
    if (!editDiary) {
      return {};
    }

    const { date, diary } = editDiary;

    return {
      bill: diary?.bill ?? [],
      diet: diary?.diet ?? [],
      fitness: diary?.fitness ?? [],
      bodyIndex: diary?.bodyIndex ?? {},
      name: dayjs(diary?.name ?? date),
      getUp: dayjs(diary?.getUp ?? date),
      toRest: dayjs(diary?.toRest ?? date),
    };
  }, [editDiary]);

  // 弹窗标题
  const title = useMemo(
    () => (
      <>
        {name?.format("YYYY-MM-DD")}
        <Icon
          type="icon-xinzeng"
          className={scss["title-tool"]}
          onClick={() => addRef.current?.()}
        />
      </>
    ),
    [name],
  );

  const handleCancel = useCallback(() => setEditDiary(null), [setEditDiary]);

  // 确认
  const onOk = useCallback(async () => {
    const values = await form.validateFields();
    const { diary } = editDiary!;

    const id = diary?.id;

    const body = getBody(values);

    onSave({ body, id });

    handleCancel();
  }, [form, editDiary, onSave, handleCancel]);

  // modal 变化时, 需要重新 resetFields
  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      className={classNames(scss.form, scss[activeTabKey])}
    >
      <Modal
        destroyOnClose
        width="80%"
        onOk={onOk}
        okText="确定"
        title={title}
        cancelText="取消"
        closable={false}
        open={!!editDiary}
        maskClosable={false}
        getContainer={false}
        className={scss.modal}
        onCancel={handleCancel}
      >
        <Tabs items={items} tabPosition="left" onChange={setActiveTabKey} />
      </Modal>
    </Form>
  );
};

export default memo(EditorCalendar);
