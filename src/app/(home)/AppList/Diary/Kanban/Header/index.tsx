import { memo } from "react";
import scss from "./index.module.scss";

const Header = (props) => (
  <div className={scss.header} {...props.provided.dragHandleProps}>
    可拖动部位
  </div>
);

export default memo(Header);
