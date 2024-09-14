import { memo } from "react";
import scss from "./index.module.scss";

// 参考: https://dribbble.com/shots/19397699-Widget-For-Communication
// https://dribbble.com/shots/16507884-Chatbot
const AI = () => (
  <div className={scss.layout}>
    <div className={scss["layout-side"]} />
    <div className={scss["layout-main"]}>TODO</div>
  </div>
);

export default memo(AI);
