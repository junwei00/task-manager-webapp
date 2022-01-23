import axios from "axios";
import { useState } from "react";
import EditTask from "./EditTask";
import TagTask from "./TagTask";
import Tag from "./Tag"

function Task({ task, tagList, getUserTags, refreshTaskNew, refreshDeletedTaskNew }) {
  const [showEditTask, setShowEditTask] = useState(false)
  const [showTagTask, setShowTagTask] = useState(false)

  function deleteTask() {
    axios
      .delete(`/api/tasks/${task.id}`)
      .then((res) => {
        refreshDeletedTaskNew(task)
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
        refreshTaskNew(res.data)
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
        refreshTaskNew(res.data)
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
             return (
              <Tag 
                key={index} 
                tag={tag} 
                task={task}
                getUserTags={getUserTags}
                refreshTaskNew={refreshTaskNew}/>)
          })} 
         </div>
         <h3 className="AddTagToTask" onClick={() => setShowTagTask(!showTagTask)}>{showTagTask ? "-" : "+"}</h3>
         {showTagTask && 
          <TagTask 
            task={task} 
            tagList={tagList} 
            getUserTags={getUserTags}
            refreshTaskNew={refreshTaskNew} />}
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
      {showEditTask && 
        <EditTask 
          task={task} 
          setShowEditTask={setShowEditTask} 
          refreshTaskNew={refreshTaskNew}
          getUserTags={getUserTags} />}
    </div>
  );
}

export default Task