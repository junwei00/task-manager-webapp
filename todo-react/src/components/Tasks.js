import { useState, useEffect } from 'react'
import axios from "axios"
import Task from './Task'

function Tasks({ setTaskList, setFilteredTaskList, filteredTaskList, tagList, getTags}) {
  return (
    <div className="Tasks">
      <h2>My Tasks</h2>
      {filteredTaskList.map((task, index) => (
        <Task key={task.id} index={index} setFilteredTaskList={setFilteredTaskList} 
          filteredTaskList={filteredTaskList} task={task} setTaskList={setTaskList}
          tagList={tagList} getTags={getTags}/>
      ))}
    </div>
  );
}

export default Tasks