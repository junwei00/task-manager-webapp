import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import Tasks from './components/Tasks'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import NewTask from './components/NewTask'

function App() {
  const [showNewTask, setShowNewTask] = useState(false)
  const [taskList, setTaskList] = useState([])

  function getTasks() {
    axios
      .get("/api/tasks")
      .then((res) => {
        setTaskList(res.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="App">
      <Sidebar />
      <div className='Main'>
        <Topbar buttonState={showNewTask} onClickNewTask={() => setShowNewTask(!showNewTask)} />
        {showNewTask && <NewTask setShowNewTask={setShowNewTask} getTasks={getTasks}/> }
        <Tasks taskList={taskList} getTasks={getTasks}/>
      </div>
    </div>
  );
}

export default App;
