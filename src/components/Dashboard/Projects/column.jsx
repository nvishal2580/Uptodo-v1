import React, { useState } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import MoreVertIcon from "@material-ui/icons/MoreHoriz";
import AddTask from "./AddTask";
import { IconButton, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Container = styled.div`
  padding: 10px 8px;
  margin: 15px;
  width: 260px;
  display: flex;
  flex-direction: column;
  background-color: white;
  flex: 0 0 auto;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${(props) => (props.isDragging ? "#dfe6e9" : "#b2bec3")};
  max-height: calc(100vh - 180px);
  :hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-color: none;
  }
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  align-items: center;
  padding-left: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TaskList = styled.div`
  padding-top: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "#FFec99" : "white")};

  transition: background-color 0.2s ease;
  flex-grow: 1;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
`;

const Column = ({
  tasks,
  column,
  index,
  handleAddTask,
  handleDeleteTask,
  handleDeleteColumn,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={column.id} key={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <TitleContainer>
            <Title {...provided.dragHandleProps}>{column.title}</Title>
            <IconButton onClick={handleClick}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <EditIcon color="primary" />
                  <Typography style={{ paddingLeft: "20px" }}>Edit</Typography>
                </div>
              </MenuItem>
              <MenuItem onClick={() => handleDeleteColumn(column.id)}>
                <div style={{ display: "flex" }}>
                  <DeleteIcon color="secondary" />
                  <Typography style={{ paddingLeft: "20px" }}>
                    Delete
                  </Typography>
                </div>
              </MenuItem>
            </Menu>
          </TitleContainer>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    handleDeleteTask={handleDeleteTask}
                    columnId={column.id}
                  />
                ))}
                <AddTask
                  title="Add Task"
                  isDraggingOver={snapshot.isDraggingOver}
                  type="task"
                  handleAddTask={handleAddTask}
                  columnId={column.id}
                />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
