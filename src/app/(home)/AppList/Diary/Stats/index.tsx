import { memo } from "react";
import Bill from "./Bill";
import BodyIndex from "./BodyIndex";
import scss from "./index.module.scss";

const Stats = () => (
  <div className={scss.stats}>
    <Bill />
    <BodyIndex />
  </div>
);

export default memo(Stats);
