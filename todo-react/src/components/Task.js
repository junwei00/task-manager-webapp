import axios from "axios";
import { useState } from "react";
import EditTask from "./EditTask";

function Task({ index, setFilteredTaskList, filteredTaskList, task, setTaskList, tagList}) {
  const [showEditTask, setShowEditTask] = useState(false)

  function refreshTask() {
    axios
      .get(`/api/tasks/${task.id}`)
      .then((res) => {
        let newTaskList = [...filteredTaskList]
        newTaskList[index] = res.data
        setFilteredTaskList(newTaskList)
        refreshTasklist()
      })
      .catch((error) => console.log(error))
  }

  function refreshTasklist() {
    axios
      .get(`/api/tasks`)
      .then((res) => {
        setTaskList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function deleteTask() {
    axios
      .delete(`/api/tasks/${task.id}`)
      .then((res) => {
        refreshTask()
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
        refreshTask()
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
        refreshTask()
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
  
  let tagString=""
  task.tags.map((tag) => {
    tagString += "#" + tag.name + " "
  })

  return (
    <div className={className}>
      <div className="Header">
         <h3 className="Title">{task.title} </h3>
         <h3 className="Tags">{tagString}</h3>
      </div>
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
      {showEditTask && <EditTask task={task} index={index} refreshTask={() => refreshTask()} 
        setShowEditTask={setShowEditTask} />}
    </div>
  );
}

export default Task