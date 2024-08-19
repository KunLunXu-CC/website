import scss from "./upload.module.scss";

import { memo } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useAlbumStore from "../hooks/useAlbumStore";

const Upload = () => {
  const { setIsUploading } = useAlbumStore();

  return (
    <div className={scss.upload}>
      <Button
        block
        type="primary"
        icon={<UploadOutlined />}
        onClick={() => setIsUploading(true)}
      >
        上传
      </Button>
    </div>
  );
};

export default memo(Upload);
