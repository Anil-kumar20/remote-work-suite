import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialColumns = {
  todo: [
    { id: "1", content: "Design homepage" },
    { id: "2", content: "Set up backend" },
  ],
  inProgress: [{ id: "3", content: "Develop login" }],
  done: [{ id: "4", content: "Create repo" }],
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceCol = columns[result.source.droppableId];
    const destCol = columns[result.destination.droppableId];

    const [removed] = sourceCol.splice(result.source.index, 1);
    destCol.splice(result.destination.index, 0, removed);

    setColumns({ ...columns });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Task Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(columns).map((colId) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded-lg min-h-[300px]"
                >
                  <h2 className="font-semibold mb-2 capitalize">{colId.replace(/([A-Z])/g, " $1")}</h2>
                  {columns[colId].map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
