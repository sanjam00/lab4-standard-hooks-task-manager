import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { addTask } = useContext(TaskContext)

  const inputId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    addTask(taskName)
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task:</label>
      <input
        id={inputId}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
