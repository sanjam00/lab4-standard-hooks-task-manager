import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  function addTask(title) {

    const newTask = {
      title: title,
      completed: false
    }

    fetch(`http://localhost:6001/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
      .then(r => {
        if (!r.ok) { throw new Error("failed to create new task") }
        return r.json();
      })
      .then(newTask => {
        console.log(newTask)
        setTasks(prevList => [...prevList, newTask])
      })
      .catch(error => console.log("Fetch request failed:", error))
  }

  function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = !task.completed

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newStatus })
    })
      .then(r => {
        if (!r.ok) { throw new Error("Failed to update completed status") }
        return r.json();
      })
      .then(updatedTask => {
        setTasks(prevList => prevList.map(task => task.id === updatedTask.id ? updatedTask : task))
      })
      .catch(error => console.log("Fetch request failed:", error))
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, toggleComplete }} >
      {children}
    </TaskContext.Provider>
  )
}
