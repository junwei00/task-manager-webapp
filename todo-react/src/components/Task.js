import axios from "axios";
import { useState } from "react";
import EditTask from "./EditTask";

function Task({ task, getTasks }) {
  const [showEditTask, setShowEditTask] = useState(false)

  function deleteTask() {
    axios
      .delete(`/api/tasks/${task.id}`)
      .then((res) => {
        getTasks()
      })
      .catch((error) => console.log(error))
  }

  function toggleFlagTask() {
    let data = (task.status == "flagged")
               ? {status: null}
               : {status: "flagged"}
    axios
      .put(`/api/tasks/${task.id}`, data)
      .then((res) => {
        getTasks()
      })
      .catch((error) => console.log(error))
  }

  function toggleDoneTask() {
    let data = (task.status == "done")
               ? {status: null}
               : {status: "done"}
    axios
      .put(`/api/tasks/${task.id}`, data)
      .then((res) => {
        getTasks()
      })
      .catch((error) => console.log(error))    
  }

  let className="Task"
  if (task.status == "flagged") {
    className += " Task-flagged"
  }
  if (task.status == "done") {
    className += " Task-done"
  }
  
  return (
    <div className={className}>
      <h3 className="Title">{task.title} </h3>
      <h4 className="Deadline">Deadline: {task.deadline}</h4>
      <p>{task.description}</p>
      <div className="Buttons">
        <button onClick = {toggleFlagTask}>
          {task.status == 'flagged' ? 'Unflag' : 'Flag'}
        </button>
        <button onClick = {() => setShowEditTask(!showEditTask)}>
        {showEditTask ? 'Close' : 'Edit'}
        </button>
        <button onClick = {toggleDoneTask}>
          {task.status == 'done' ? 'Undo' : 'Done'}
        </button>
        <button onClick = {deleteTask}>
        Delete
        </button>
      </div>
      {showEditTask && <EditTask task={task} getTasks={getTasks} setShowEditTask={setShowEditTask} />}
    </div>
  );
}

export default Task