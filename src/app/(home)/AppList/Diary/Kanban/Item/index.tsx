import classNames from "classnames";
import scss from "./index.module.scss";
import { memo } from "react";

const Item = (props) => (
  <div
    ref={props.provided.innerRef}
    className={classNames(scss.item, {
      [scss.dragging]: props.snapshot.isDragging,
    })}
    {...props.provided.draggableProps}
    {...props.provided.dragHandleProps}
  >
    {props.data.name}
  </div>
);

export default memo(Item);
