import Task from './Task'
import { useState } from 'react'

function Tasks({ currentUserId, setTaskList, setFilteredTaskList, filteredTaskList, tagList, getUserTags, setTaggedTaskList, refreshTask }) {
  return (
    <div className="Tasks">
      {filteredTaskList.map((task, index) => {
        if (task.status !== "done") {
          return <Task currentUserId={currentUserId} key={task.id} index={index} setFilteredTaskList={setFilteredTaskList} 
            filteredTaskList={filteredTaskList} task={task} setTaskList={setTaskList}
            tagList={tagList} getUserTags={getUserTags} setTaggedTaskList={setTaggedTaskList} refreshTask={refreshTask}/>
        }
      })}
      {filteredTaskList.map((task, index) => {
        if (task.status === "done") {
          return <Task currentUserId={currentUserId} key={task.id} index={index} setFilteredTaskList={setFilteredTaskList} 
            filteredTaskList={filteredTaskList} task={task} setTaskList={setTaskList}
            tagList={tagList} getUserTags={getUserTags} setTaggedTaskList={setTaggedTaskList} refreshTask={refreshTask}/>
        }
    })}
    </div>
  );
}

export default Tasks