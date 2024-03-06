import classNames from 'classnames';
import scss from './index.module.scss';

export default (props) => (
  <div
    ref={props.provided.innerRef}
    className={classNames(scss.item, {
      [scss.dragging]: props.snapshot.isDragging,
    })}
    {... props.provided.draggableProps}
    {... props.provided.dragHandleProps}>
    {props.data.name}
  </div>
);
