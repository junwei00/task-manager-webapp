import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import Tasks from './components/Tasks'
import TopBar from './components/TopBar'
import NewTask from './components/NewTask'

function App() {
  const [showNewTask, setShowNewTask] = useState(false);

  return (
    <div className="App">
      <TopBar buttonState={showNewTask} onClickNewTask={() => setShowNewTask(!showNewTask)} />
      {showNewTask && <NewTask /> }
      <Tasks />
    </div>
  );
}

export default App;
