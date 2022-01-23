import Task from './Task'
import { useState, useEffect } from 'react'

function Tasks({ filteredTaskList, tagList, getUserTags, refreshTask, refreshDeletedTask }) {
  const [showDoneTasks, setShowDoneTasks] = useState(false)

  return (
    <div className="Tasks">
      {filteredTaskList
        .filter((task) => {return task.status !== "done"}) 
        .map(task => {
          return (
            <Task 
              key={task.id} 
              task={task} 
              tagList={tagList} 
              getUserTags={getUserTags}  
              refreshTaskNew={refreshTask}
              refreshDeletedTaskNew={refreshDeletedTask} />)
        })
      }
      <button className='ShowDoneButton' onClick={() => setShowDoneTasks(!showDoneTasks)}>
        {showDoneTasks ? "Hide Completed Tasks ▲" : "Show Completed Tasks ▼"}
      </button>
      {showDoneTasks && 
        filteredTaskList
        .filter((task) => {return task.status === "done"}) 
        .map(task => {
          return (
            <Task
              key={task.id} 
              task={task} 
              tagList={tagList} 
              getUserTags={getUserTags}  
              refreshTaskNew={refreshTask}
              refreshDeletedTaskNew={refreshDeletedTask} />)
        })
      }
    </div>
  );
}

export default Tasks