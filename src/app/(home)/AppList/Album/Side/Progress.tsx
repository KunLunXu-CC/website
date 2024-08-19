import { FC, memo } from "react";
import scss from "./progress.module.scss";

const Progress: FC = () => (
  <div className={scss.progress}>
    <div className={scss["progress-wrapper"]}>
      <div className={scss["progress-bar"]} />
    </div>
    <div className={scss.detail}>280.2G / 2055G</div>
  </div>
);

export default memo(Progress);
