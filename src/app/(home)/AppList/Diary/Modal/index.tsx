import { memo } from "react";
import scss from "./index.module.scss";
import EditorCalendar from "./EditorCalendar";

const Modal = () => (
  <div className={scss.modal}>
    <EditorCalendar />
  </div>
);

export default memo(Modal);
