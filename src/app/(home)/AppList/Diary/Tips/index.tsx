import scss from "./index.module.scss";

import { Spin } from "antd";
import { useSelector } from "react-redux";
import { APP_SETTING } from "@/config/constants";
import { memo } from "react";

const useStateHook = () => {
  const showSpin = useSelector((state) => state.spin?.[APP_SETTING.DIARY.code]);
  return { showSpin };
};

const Tips = () => {
  const state = useStateHook();
  return (
    <>
      {state.showSpin ? <Spin className={scss.spin} size="large" /> : null}
      <div id={APP_SETTING.DIARY.code} className={scss.notification} />
    </>
  );
};

export default memo(Tips);
