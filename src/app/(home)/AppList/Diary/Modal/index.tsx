import { memo } from "react";
import BillDetail from "./BillDetail";
import EditorCalendar from "./EditorCalendar";
import scss from "./index.module.scss";

const Modal = () => (
  <div className={scss.modal}>
    <EditorCalendar />
    <BillDetail />
  </div>
);

export default memo(Modal);
