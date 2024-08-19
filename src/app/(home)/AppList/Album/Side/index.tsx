import Menu from "./Menu";
import Upload from "./Upload";
import Progress from "./Progress";
import scss from "./index.module.scss";
import { memo } from "react";

const Side = () => (
  <div className={scss.side}>
    <div className={scss["side-upload"]}>
      <Upload />
    </div>
    <div className={scss["side-menu"]}>
      <Menu />
    </div>
    <div className={scss["side-progress"]}>
      <Progress />
    </div>
  </div>
);

export default memo(Side);
