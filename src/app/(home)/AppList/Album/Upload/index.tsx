import Form from "./Form";
import Footer from "./Footer";
import scss from "./index.module.scss";
import useAlbumStore from "../hooks/useAlbumStore";

import { memo } from "react";
import { Drawer } from "antd";

const Upload = () => {
  const { isUploading, setIsUploading } = useAlbumStore();

  return (
    <Drawer
      width="420"
      title="文件上传"
      placement="left"
      open={isUploading}
      getContainer={false}
      className={scss.upload}
      onClose={() => setIsUploading(false)}
    >
      <Form />
      <Footer />
    </Drawer>
  );
};

export default memo(Upload);
