import React from 'react';
import mock from './mock';
import Item from './Item';
import List from './List';
import Header from './Header';
import classNames from 'classnames';
import scss from './index.module.scss';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStateHook = () => {
  const [data, setData] = React.useState(mock);

  const onDragEnd = () => {
    setData(data);
  };

  return { onDragEnd, data };
};

export default () => {
  const state = useStateHook();

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={state.onDragEnd}>
        <Droppable
          type="COLUMN"
          droppableId="columns"
          direction="horizontal">
          {provided => (
            <div
              className={scss.kanban}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {state.data.map((v, index) => (
                <Draggable key={index} draggableId={v.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={classNames(scss.column, {
                        [scss.dragging]: snapshot.isDragging,
                      })}
                      {...provided.draggableProps}>
                      <Header
                        data={v}
                        provided={provided}
                        snapshot={snapshot}
                      />
                      <Droppable type="ITEM" droppableId={v.id}>
                        {provided => (
                          <div
                            className={scss.items}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {v.tasks.map((task, index) => (
                              <Draggable
                                key={task.id}
                                index={index}
                                draggableId={task.id}>
                                {(provided, snapshot) => (
                                  <Item
                                    data={task}
                                    provided={provided}
                                    snapshot={snapshot}
                                  />
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <List/>
    </React.Fragment>
  );
};
