import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TaskContainer from "./TaskContainer";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 14px;
  padding: 8px;
  margin: 10px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#DEEBFF" : "white")};
  color: ${(props) => (props.isDragging ? "black" : "black")};
`;

function Task({ task, index, handleDeleteTask, columnId }) {
  console.log("task.js rerendered");
  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided, sanpshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={sanpshot.isDragging}
        >
          <TaskContainer
            task={task}
            handleDeleteTask={handleDeleteTask}
            columnId={columnId}
          />
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
