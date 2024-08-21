import scss from "./form.module.scss";
import useAlbumStore from "../hooks/useAlbumStore";

import { Select } from "antd";
import { Icon, Image } from "@kunlunxu/brick";
import { PHOTO_TYPE } from "@/config/constants";
import { ChangeEvent, memo, useCallback } from "react";

// select option 数据
const OPTIONS = Object.keys(PHOTO_TYPE).map((key: string) => {
  const { VALUE, DESC } = PHOTO_TYPE[key as keyof typeof PHOTO_TYPE] as {
    VALUE: number;
    DESC: string;
  };

  return { key: VALUE, title: DESC, value: VALUE };
});

const Form = () => {
  const { updateForm, form } = useAlbumStore();

  // 添加文件
  const addFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      updateForm({ files: [...form.files, ...e.target.files] });
    },
    [form, updateForm],
  );

  return (
    <div className={scss.form}>
      <div className={scss.select}>
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="选择上传图片类型"
          onChange={(type) => updateForm({ type })}
        >
          {OPTIONS.map((v) => (
            <Select.Option key={v.key} value={v.value}>
              {v.title}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={scss["upload-list"]}>
        <label className={scss.upload}>
          <Icon type="icon-tupianshangchuan" />
          <input multiple type="file" accept="image/*" onChange={addFiles} />
        </label>
        {form.files.map((file: File, index: number) => (
          <div key={index} className={scss.item}>
            <Image alt="file" src={file} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Form);
