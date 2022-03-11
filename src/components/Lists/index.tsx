import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "To do",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

export const Lists: React.FC<{}> = () => {
  const [taskColumns, setTaskColumns] = useState(columnsFromBackend);

  const onDragEnd = (result: any, taskColumns: any, setTaskColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = taskColumns[source.droppableId];
      const destColumn = taskColumns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setTaskColumns({
        ...taskColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = taskColumns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setTaskColumns({
        ...taskColumns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const renderColumnHeading = (column: any) => {
    let heading: any = null;
    if (column.name === "To do") {
      heading = (
        <div className="column-todo">
          <h2>{column.name}</h2>
        </div>
      );
    } else if (column.name === "In Progress") {
      heading = (
        <div className="column-inprogress">
          <h2>{column.name}</h2>
        </div>
      );
    } else if (column.name === "Done") {
      heading = (
        <div className="column-done">
          <h2>{column.name}</h2>
        </div>
      );
    }
    return heading;
  };

  return (
    <div className="context-wrapper">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, taskColumns, setTaskColumns)}
      >
        {Object.entries(taskColumns).map(([columnId, column], index) => {
          return (
            <div className="column-wrap" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      className="dropbox"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#ccc"
                          : "#ffffff",
                      }}
                    >
                      {renderColumnHeading(column)}
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className="dragbox"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    backgroundColor: snapshot.isDragging
                                      ? "#c3c3c3"
                                      : "#ffffff",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.content}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Lists;
