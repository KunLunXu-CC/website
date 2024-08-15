import List from "./List";
import { memo } from "react";

import useAppStore from "@/store/useAppStore";

const DockList = () => {
  const { docks, openApp } = useAppStore();

  return <List onClick={openApp} dataSource={docks} />;
};

export default memo(DockList);
