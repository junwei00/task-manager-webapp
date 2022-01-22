import Task from './Task'
import { useState } from 'react'

function Tasks({ setTaskList, setFilteredTaskList, filteredTaskList, tagList, getTags, setTaggedTaskList }) {
  return (
    <div className="Tasks">
      {filteredTaskList.map((task, index) => {
        if (task.status !== "done") {
          return <Task key={task.id} index={index} setFilteredTaskList={setFilteredTaskList} 
            filteredTaskList={filteredTaskList} task={task} setTaskList={setTaskList}
            tagList={tagList} getTags={getTags} setTaggedTaskList={setTaggedTaskList}/>
        }
      })}
      {filteredTaskList.map((task, index) => {
        if (task.status === "done") {
          return <Task key={task.id} index={index} setFilteredTaskList={setFilteredTaskList} 
            filteredTaskList={filteredTaskList} task={task} setTaskList={setTaskList}
            tagList={tagList} getTags={getTags} setTaggedTaskList={setTaggedTaskList}/>
        }
    })}
    </div>
  );
}

export default Tasks