import List from "./List";
import Header from "./Header";
import scss from "./index.module.scss";
import { memo } from "react";

const Body = () => (
  <div className={scss.body}>
    <Header />
    <List />
  </div>
);

export default memo(Body);
