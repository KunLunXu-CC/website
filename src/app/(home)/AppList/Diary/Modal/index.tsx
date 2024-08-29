import { memo, useRef } from "react";
import BillDetail from "./BillDetail";
import scss from "./index.module.scss";
import EditorCalendar from "./EditorCalendar";

const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={modalRef} className={scss.modal}>
      <EditorCalendar />
      <BillDetail modalRef={modalRef} />
    </div>
  );
};

export default memo(Modal);
