import { useState, useEffect } from 'react'
import axios from "axios"
import Task from './Task'

function Tasks({ taskList, getTasks}) {
  return (
    <div className="Tasks">
      <h2>My Tasks</h2>
      {taskList.map((task) => (
        <Task key={task.id} task={task} getTasks={getTasks} />
      ))}
    </div>
  );
}

export default Tasks