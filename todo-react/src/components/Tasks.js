import Task from './Task'

function Tasks({ filteredTaskList, tagList, getUserTags, refreshTask, refreshDeletedTask }) {
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
      {filteredTaskList
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