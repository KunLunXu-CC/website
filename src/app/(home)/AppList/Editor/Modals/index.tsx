import Move from "./Move";
import ThumbSetting from "./ThumbSetting";
import RevokeConfirm from "./RevokeConfirm";
import ReleaseConfirm from "./ReleaseConfirm";
import scss from "./index.module.scss";
import { memo } from "react";

const Modals = () => (
  <div className={scss.modals}>
    <ThumbSetting />
    <RevokeConfirm />
    <ReleaseConfirm />
    <Move />
  </div>
);

export default memo(Modals);
