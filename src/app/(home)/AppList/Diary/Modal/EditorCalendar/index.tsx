import Base from "./Base";
import Bill from "./Bill";
import Diet from "./Diet";
import dayjs from "dayjs";
import Fitness from "./Fitness";
import classNames from "classnames";
import scss from "./index.module.scss";
import useDisclosureStore from "@/store/useDisclosureStore";

import { Icon } from "@kunlunxu/brick";
import { Modal, Tabs, Form } from "antd";
import { DIARY_EDITOR_DIARY } from "../../constants";
import { memo, useRef, useMemo, useState, useEffect, useCallback } from "react";
import {
  useCreateDiariesMutation,
  useUpdateDiariesMutation,
} from "@/store/graphql";
import { DiaryItemFragment } from "@/gql/graphql";

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
  const addRef = useRef<() => void>();
  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const [activeTabKey, setActiveTabKey] = useState<string>(TABS_SETTING[0].key);

  const [createDiaries] = useCreateDiariesMutation();
  const [updateDiaries] = useUpdateDiariesMutation();
  const { isOpen, getData, onClose } = useDisclosureStore();

  const open = isOpen(DIARY_EDITOR_DIARY);
  const modalData = getData(DIARY_EDITOR_DIARY) as {
    date?: dayjs.Dayjs;
    diary?: DiaryItemFragment;
  } | void;

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
    if (!modalData) {
      return {};
    }

    return {
      bill: modalData.diary?.bill ?? [],
      diet: modalData.diary?.diet ?? [],
      fitness: modalData.diary?.fitness ?? [],
      bodyIndex: modalData.diary?.bodyIndex ?? {},
      name: dayjs(modalData.diary?.name ?? modalData.date),
      getUp: dayjs(modalData.diary?.getUp ?? modalData.date),
      toRest: dayjs(modalData.diary?.toRest ?? modalData.date),
    };
  }, [modalData]);

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

  const handleCancel = useCallback(
    () => onClose(DIARY_EDITOR_DIARY),
    [onClose],
  );

  // 确认
  const onOk = useCallback(async () => {
    const values = await form.validateFields();

    const id = modalData?.diary?.id;
    const body = getBody(values);
    console.log(
      "%c [ body ]-127",
      "font-size:13px; background:pink; color:#bf2c9f;",
      body,
    );

    // const res = id
    //   ? await updateDiaries({ body, conds: { id } })
    //   : await createDiaries({ body });
    // const { change } = res.data[id ? "updateDiaries" : "createDiaries"];

    // dispatch(actions.diary.updateDiaries(change));
    handleCancel();
  }, [form, handleCancel, createDiaries, updateDiaries, modalData?.diary?.id]);

  // modal 变化时, 需要重新 resetFields
  useEffect(() => {
    form.resetFields();
  }, [form, modalData]);

  console.log(
    "%c [ initialValues ]-148",
    "font-size:13px; background:pink; color:#bf2c9f;",
    initialValues,
  );

  return (
    <Form
      form={form}
      initialValues={initialValues}
      className={classNames(scss.form, scss[activeTabKey])}
    >
      <Modal
        destroyOnClose
        open={open}
        width="80%"
        onOk={onOk}
        okText="确定"
        title={title}
        cancelText="取消"
        closable={false}
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
