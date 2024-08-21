import scss from "./footer.module.scss";
import useAlbumStore from "../hooks/useAlbumStore";
import useAlbumUpload from "../hooks/useAlbumUpload";

import { Button } from "antd";
import { memo, useCallback } from "react";

const Footer = () => {
  const { onUpload } = useAlbumUpload();
  const { setIsUploading } = useAlbumStore();

  // 取消
  const handleCancel = useCallback(
    () => setIsUploading(false),
    [setIsUploading],
  );

  return (
    <div className={scss.footer}>
      <Button type="primary" onClick={onUpload}>
        上传
      </Button>
      <Button onClick={handleCancel}>取消</Button>
    </div>
  );
};

export default memo(Footer);
