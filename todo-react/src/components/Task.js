import axios from "axios";
import { useState } from "react";
import EditTask from "./EditTask";

function Task({ task, updater }) {
  const [showEditTask, setShowEditTask] = useState(false)

  function deleteTask() {
    axios
      .delete(`/api/tasks/${task.id}`)
      .then((res) => {
        updater()
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <h3>{task.title} </h3>
      <div>{task.description}</div>
        <div>
          <button onClick = {() => setShowEditTask(!showEditTask)}>
          {showEditTask ? 'Close' : 'Edit'}
          </button>
          <button onClick = {deleteTask}>
          Delete
          </button>
      </div>
      {showEditTask && <EditTask task={task} updater={updater}/>}
    </div>
  );
}

export default Task