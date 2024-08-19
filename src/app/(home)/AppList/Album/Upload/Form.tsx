import scss from "./form.module.scss";

import { Select } from "antd";
import { actions } from "@/store";
import { PHOTO_TYPE } from "@/config/constants";
import { memo, useCallback, useMemo } from "react";
import { Icon, Image } from "@kunlunxu/brick";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();

  const { files } = useSelector((state) => state.photos?.upload);

  // select option 数据
  const options = useMemo(
    () =>
      Object.keys(PHOTO_TYPE).map((key) => ({
        key: PHOTO_TYPE[key].VALUE,
        title: PHOTO_TYPE[key].DESC,
        value: PHOTO_TYPE[key].VALUE,
      })),
    [],
  );

  // 切换类型
  const handleSelectChange = useCallback(
    (type) => {
      dispatch(actions.photos.updateUpload({ type }));
    },
    [dispatch],
  );

  // 添加文件
  const addFiles = useCallback(
    (e) => {
      dispatch(
        actions.photos.updateUpload({
          files: [...files, ...e.target.files],
        }),
      );
    },
    [dispatch, files],
  );

  return (
    <div className={scss.form}>
      <div className={scss.select}>
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="选择上传图片类型"
          onChange={handleSelectChange}
        >
          {options.map((v) => (
            <Select.Option key={v.key} value={v.value}>
              {v.title}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={scss["upload-list"]}>
        <label className={scss.upload}>
          <Icon type="icon-tupianshangchuan" />
          <input
            type="file"
            accept="image/*"
            multiple="multiple"
            onChange={addFiles}
          />
        </label>
        {files.map((file, index) => (
          <div key={index} className={scss.item}>
            <Image src={file} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Form);
