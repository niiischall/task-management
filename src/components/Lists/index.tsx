import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

export interface Props {
  columns: {};
  handleMovement: Function;
}

export const Lists: React.FC<Props> = ({ columns, handleMovement }) => {
  const onDragEnd = (result: any, taskColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = taskColumns[source.droppableId];
      const destColumn = taskColumns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      handleMovement({
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
      handleMovement({
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
          <div className="column-count">
            <span>
              {column.items.length} <br /> Projects
            </span>
          </div>
        </div>
      );
    } else if (column.name === "In Progress") {
      heading = (
        <div className="column-inprogress">
          <h2>{column.name}</h2>
          <div className="column-count">
            <span>
              {column.items.length} <br /> Projects
            </span>
          </div>
        </div>
      );
    } else if (column.name === "Done") {
      heading = (
        <div className="column-done">
          <h2>{column.name}</h2>
          <div className="column-count">
            <span>
              {column.items.length} <br /> Projects
            </span>
          </div>
        </div>
      );
    }
    return heading;
  };

  const renderCompeleted = (column: any) => {
    if (column.name === "Done") {
      return <span style={{ marginRight: "2.5px" }}>&#x2713;</span>;
    }
    console.log(column);
    return null;
  };

  return (
    <div className="context-wrapper">
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns)}>
        {Object.entries(columns).map(
          ([columnId, column]: any, index: number) => {
            return (
              <div className="column-wrap" key={columnId}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided: any, snapshot: any) => {
                    return (
                      <div
                        className="dropbox"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#F2F2F2"
                            : "#ffffff",
                        }}
                      >
                        {renderColumnHeading(column)}
                        {column.items.map((item: any, index: any) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided: any, snapshot: any) => {
                                return (
                                  <div
                                    className="dragbox"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#FFFFFF"
                                        : "#F2F2F2",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {renderCompeleted(column)}
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
          }
        )}
      </DragDropContext>
    </div>
  );
};

export default Lists;
