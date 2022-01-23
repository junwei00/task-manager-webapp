import axios from "axios";
import { useState } from "react";
import EditTask from "./EditTask";
import TagTask from "./TagTask";
import Tag from "./Tag"

function Task({ currentUserId, index, task,  setFilteredTaskList, filteredTaskList, setTaggedTaskList, setTaskList, tagList, getUserTags, refreshTask}) {
  const [showEditTask, setShowEditTask] = useState(false)
  const [showTagTask, setShowTagTask] = useState(false)

  function refreshTask() {
    axios
      .get(`/api/tasks/${task.id}`)
      .then((res) => {
        let newTaskList = [...filteredTaskList]
        newTaskList[index] = res.data
        setFilteredTaskList(newTaskList)
        setTaggedTaskList(newTaskList)
        refreshTasklist()
        getUserTags()
      })
      .catch((error) => console.log(error))
  }

  function refreshTasklist() {
    axios
      .get(`/api/${currentUserId}/tasks`)
      .then((res) => {
        setTaskList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function refreshDeletedTask() {
    let newTaskList = [...filteredTaskList]
    newTaskList.splice(index, 1)
    setFilteredTaskList(newTaskList)
    setTaggedTaskList(newTaskList)
    refreshTasklist()
    getUserTags()
  }

  function refreshTaskStatus(newstatus) {
    let newTaskList = [...filteredTaskList]
    newTaskList[index].status = newstatus
    setFilteredTaskList(newTaskList)
    setTaggedTaskList(newTaskList)
    refreshTasklist()
    getUserTags()
  }

  function refreshTaskTags(newtag) {
    let newTaskList = [...filteredTaskList]
    newTaskList[index].tags.push(newtag)
    setFilteredTaskList(newTaskList)
    setTaggedTaskList(newTaskList)
    refreshTasklist()
    getUserTags()
  }

  function refreshDeletedTaskTag(tagindex) {
    let newTaskList = [...filteredTaskList]
    newTaskList[index].tags.splice(tagindex, 1)
    setFilteredTaskList(newTaskList)
    setTaggedTaskList(newTaskList)
    refreshTasklist()
    getUserTags()
  }

  function deleteTask() {
    axios
      .delete(`/api/tasks/${task.id}`)
      .then((res) => {
        refreshDeletedTask()
      })
      .catch((error) => console.log(error))
  }

  function toggleFlagTask() {
    let newstatus = (task.status == "flagged")
               ? null
               : 'flagged'
    axios
      .put(`/api/tasks/${task.id}`, {status: newstatus})
      .then((res) => {
        refreshTaskStatus(newstatus)
      })
      .catch((error) => console.log(error))
  }

  function toggleDoneTask() {
    let newstatus = (task.status == "done")
               ? null
               : 'done'
    axios
      .put(`/api/tasks/${task.id}`, {status: newstatus})
      .then((res) => {
        refreshTaskStatus(newstatus)
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
      <div className="Header">
         <h3 className="Title">{task.title} </h3>
         <div className="TagsBar">
            {task.tags.map((tag, index) => {
             return <Tag key={index} index={index} tag={tag} refreshDeletedTaskTag={refreshDeletedTaskTag} task={task}/>
          })} 
         </div>
         <h3 className="AddTagToTask" onClick={() => setShowTagTask(!showTagTask)}>{showTagTask ? "-" : "+"}</h3>
         {showTagTask && <TagTask task={task} tagList={tagList} refreshTaskTags={refreshTaskTags}/>}
      </div>
      <h4 className="Deadline">Deadline: {task.deadline === null ? "None" : task.deadline}</h4>
      <p>{task.description}</p>
      <div className="Buttons">
        <button onClick = {toggleDoneTask}>
          {task.status == 'done' ? 'Undo' : 'Done'}
        </button>
        <button onClick = {toggleFlagTask}>
          {task.status == 'flagged' ? 'Unflag' : 'Flag'}
        </button>
        <button onClick = {() => setShowEditTask(!showEditTask)}>
        {showEditTask ? 'Close' : 'Edit'}
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