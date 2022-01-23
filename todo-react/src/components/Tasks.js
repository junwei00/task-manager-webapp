import Task from './Task'
import { useState } from 'react'

function Tasks({ filteredTaskList, tagList, getUserTags, refreshTask, refreshDeletedTask }) {
  return (
    <div className="Tasks">
      {filteredTaskList.map((task, index) => {
        if (task.status !== "done") {
          return (
            <Task 
              key={task.id} 
              index={index} 
              task={task} 
              tagList={tagList} 
              getUserTags={getUserTags}  
              refreshTaskNew={refreshTask}
              refreshDeletedTaskNew={refreshDeletedTask} />)
        }
      })}
      {filteredTaskList.map((task, index) => {
        if (task.status === "done") {
          return (
            <Task 
              key={task.id} 
              index={index} 
              task={task} 
              tagList={tagList} 
              getUserTags={getUserTags}  
              refreshTaskNew={refreshTask}
              refreshDeletedTaskNew={refreshDeletedTask} />)
        }
    })}
    </div>
  );
}

export default Tasks