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

  return (
    <div className="Task">
      <h3>{task.title} </h3>
      <p>{task.description}</p>
      <div className="Buttons">
        <button onClick = {() => setShowEditTask(!showEditTask)}>
        {showEditTask ? 'Close' : 'Edit'}
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