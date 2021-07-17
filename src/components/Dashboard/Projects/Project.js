import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultdata from "./initialData";
import Column from "./column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddTask from "./AddTask";
import { v4 as uuidv4 } from "uuid";
import "reset-css";
import firebase, { db } from "../../../firebase/firebase";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  background-color: ${(props) => (props.isDraggingOver ? "#dfe6e9" : "white")};
  transition: background-color 0.3s ease;
  overflow-x: scroll;
  overflow-y: scroll;
  font-family: "Roboto";
  min-height: calc(100vh - 110px);
  /* max-width: calc(100% - 250px); */
`;
function Project({ data, projectId }) {
  const [tasks, setTasks] = useState({});
  const [columns, setColumns] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log("data updated at project", data);
    setTasks(data.tasks);
    setColumns(data.columns);
    setColumnOrder(data.columnOrder);
    setLoading(false);
  }, [data]);

  const handleAddTask = async (columnId, text) => {
    console.log(columnId, text);
    setLoading(true);
    const Id = uuidv4().toString();
    const newTask = {
      id: Id,
      text: text,
      subtext: "",
    };
    const newTaskList = {
      ...tasks,
      [Id]: newTask,
    };

    let col = columns[columnId];
    let newTaskIds = [...col.taskIds, Id];
    col = { ...col, taskIds: newTaskIds };
    console.log(col);

    let newColumns = { ...columns };
    newColumns = { ...newColumns, [columnId]: col };

    const projectRef = await db.collection("projects").doc(projectId);
    projectRef.update({ tasks: newTaskList });

    projectRef.update({ columns: newColumns });

    console.log(newTaskList);
    console.log(newColumns);

    setTasks(newTaskList);
    setColumns(newColumns);
    setLoading(false);
  };

  const handleDeleteColumn = (columnId) => {
    console.log("column id", columnId);

    const col = columns[columnId];
    const taskIds = col.taskIds;
    let newTasks = { ...tasks };

    let newColumns = { ...columns };
    delete newColumns[columnId];
    const newColumnOrder = columnOrder.filter((colId) => colId !== columnId);

    // setTasks(newTasks);
    // setColumns(newColumns);
    // setColumnOrder(newColumnOrder);

    db.collection("projects")
      .doc(projectId)
      .update({
        [`columns.${columnId}`]: firebase.firestore.FieldValue.delete(),
        columnOrder: firebase.firestore.FieldValue.arrayRemove(columnId),
      });

    taskIds.forEach((taskId) => {
      db.collection("projects")
        .doc(projectId)
        .update({
          [`tasks.${taskId}`]: firebase.firestore.FieldValue.delete(),
        });
      delete newTasks[taskId];
    });

    // db.collection("projects")
    //   .doc(projectId)
    //   .update({
    //     columnOrder: firebase.firestore.FieldValue.arrayRemove(columnId),
    //   });
  };

  const handleDeleteTask = (taskId, columnId) => {
    console.log(columnId, taskId);

    let newTasks = { ...tasks };
    delete newTasks[taskId];
    const newTaskIds = columns[columnId].taskIds.filter((id) => id !== taskId);
    const newColumn = columns;
    newColumn[columnId].taskIds = newTaskIds;
    const newColumnOrder = [...columnOrder];
    setColumns(newColumn);
    setTasks(newTasks);

    db.collection("projects")
      .doc(projectId)
      .update({ [`columns.${columnId}.taskIds`]: newTaskIds });
    db.collection("projects")
      .doc(projectId)
      .update({ [`tasks.${taskId}`]: firebase.firestore.FieldValue.delete() });

    setColumnOrder(newColumnOrder);
    console.log(newTasks);
    console.log(newColumn);
  };

  console.log("index.js rendered");

  const handleAddColumn = async (title) => {
    setLoading(true);
    const Id = uuidv4().toString();
    const newColumn = {
      id: Id,
      title: title,
      taskIds: [],
    };

    const newColumns = {
      ...columns,
      [Id]: newColumn,
    };
    console.log(columnOrder);
    const newColumnOrder = [...columnOrder, Id];
    const projectRef = await db.collection("projects").doc(projectId);
    projectRef.update({ columns: newColumns });

    projectRef.update({ columnOrder: newColumnOrder });

    setColumns(newColumns);
    setColumnOrder(newColumnOrder);

    console.log(newColumnOrder);
    console.log(newColumns);

    setLoading(false);
  };

  const onDragEnd = (result) => {
    // console.log(result);
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {
      const newColumnOrder = [...columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);
      db.collection("projects")
        .doc(projectId)
        .update({ columnOrder: newColumnOrder });
      return;
    }

    // const newColumns = columns;
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newColumns);
      db.collection("projects")
        .doc(projectId)
        .update({ [`columns.${newColumn.id}`]: newColumn });

      return;
    }

    // moving task from one column to another

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    db.collection("projects")
      .doc(projectId)
      .update({ [`columns.${newStart.id}`]: newStart });

    const endTaskIds = [...end.taskIds];
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      taskIds: endTaskIds,
    };
    const newColumns = {
      ...columns,
      [newStart.id]: newStart,
      [newEnd.id]: newEnd,
    };

    db.collection("projects")
      .doc(projectId)
      .update({ [`columns.${newEnd.id}`]: newEnd });

    setColumns(newColumns);
  };

  const onDragStart = (result) => {};

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            type="column"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {columnOrder &&
                  columnOrder.map((columnId, index) => {
                    console.log("columnOrder", columnOrder);
                    console.log("tasks", tasks);
                    console.log("columns", columns);
                    const column = columns[columnId];
                    const columnTasks = column.taskIds.map(
                      (taskId) => tasks[taskId]
                    );
                    return (
                      <Column
                        key={columnId}
                        tasks={columnTasks}
                        column={column}
                        index={index}
                        setColumnOrder={setColumnOrder}
                        setColumns={setColumns}
                        setTasks={setTasks}
                        handleAddTask={handleAddTask}
                        handleDeleteTask={handleDeleteTask}
                        handleDeleteColumn={handleDeleteColumn}
                      />
                    );
                  })}
                <AddTask
                  isDraggingOver={snapshot.isDraggingOver}
                  title="ADD Column"
                  type="column"
                  handleAddColumn={handleAddColumn}
                />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}

export default Project;
