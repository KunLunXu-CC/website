import { memo } from "react";
import BillDetail from "./BillDetail";
import scss from "./index.module.scss";
import EditorCalendar from "./EditorCalendar";

const Modal = () => (
  <div className={scss.modal}>
    <EditorCalendar />
    <BillDetail />
  </div>
);

export default memo(Modal);
