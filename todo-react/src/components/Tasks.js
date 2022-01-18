import { useState, useEffect } from 'react'
import axios from "axios"
import Task from './Task'

function Tasks() {
  const [taskList, setTaskList] = useState([])
  const [updateTasks, setUpdateTasks] = useState(false)

  function updater() {
    setUpdateTasks(!updateTasks)
  }

  function getTasks() {
    axios
      .get("/api/tasks")
      .then((res) => {
        setTaskList(res.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getTasks()
  }, [updateTasks])

  return (
    <div>
      <h2>My Tasks</h2>
      {taskList.map((task) => (
        <Task key={task.id} task={task} updater={updater} />
      ))}
    </div>
  );
}

export default Tasks