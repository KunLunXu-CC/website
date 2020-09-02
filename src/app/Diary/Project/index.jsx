import React from 'react';
import scss from './index.module.scss';
import mock from './mock';
import Column from './Column';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const useStateHook = () => {
  const [data, setData] = React.useState(mock);

  const onDragEnd = () => {};
  return { onDragEnd, data };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.project}>
      <DragDropContext onDragEnd={state.onDragEnd}>
        <Droppable
          droppableId="board"
          direction="horizontal">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {state.data.map(v => <Column data={v} key={v.id}/>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
